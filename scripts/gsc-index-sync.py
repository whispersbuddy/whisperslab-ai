#!/usr/bin/env python3
"""
Resubmits the whisperslab.com sitemap to Google Search Console and reports
per-URL indexing status. There is no public API for the "Request Indexing"
UI button, so this is the closest legitimate equivalent: nudge Google to
recrawl the sitemap, then ask the URL Inspection API where each page stands.

Usage (on the VPS, where the service account key lives):
    pip install google-api-python-client google-auth
    python3 scripts/gsc-index-sync.py

Requires:
    - secrets/gsc-service-account.json at repo root on the VPS
    - that service account's client_email added as a user on the
      sc-domain:whisperslab.com property in Search Console
"""
import json
import sys
import time
from pathlib import Path

from google.oauth2 import service_account
from googleapiclient.discovery import build

SITE_PROPERTY = "sc-domain:whisperslab.com"
SITEMAP_URL = "https://www.whisperslab.com/sitemap.xml"
KEY_PATH = Path(__file__).resolve().parent.parent / "secrets" / "gsc-service-account.json"
SCOPES = ["https://www.googleapis.com/auth/webmasters"]

# Kept in sync with app/sitemap.ts. Update this list (or wire it up to read
# the live sitemap.xml) if routes change.
URLS = [
    "https://www.whisperslab.com/",
    "https://www.whisperslab.com/audit",
    "https://www.whisperslab.com/core-build",
    "https://www.whisperslab.com/case-studies",
    "https://www.whisperslab.com/blog",
    "https://www.whisperslab.com/contact",
    "https://www.whisperslab.com/book",
]


def get_service():
    if not KEY_PATH.exists():
        sys.exit(f"Service account key not found at {KEY_PATH}")
    creds = service_account.Credentials.from_service_account_file(
        str(KEY_PATH), scopes=SCOPES
    )
    return build("searchconsole", "v1", credentials=creds)


def resubmit_sitemap(service):
    service.sitemaps().submit(siteUrl=SITE_PROPERTY, feedpath=SITEMAP_URL).execute()
    print(f"Resubmitted sitemap: {SITEMAP_URL}")


def inspect_urls(service):
    print("\nIndexing status:")
    for url in URLS:
        body = {"inspectionUrl": url, "siteUrl": SITE_PROPERTY}
        result = service.urlInspection().index().inspect(body=body).execute()
        status = result["inspectionResult"]["indexStatusResult"]
        verdict = status.get("verdict", "UNKNOWN")
        coverage = status.get("coverageState", "n/a")
        last_crawl = status.get("lastCrawlTime", "never crawled")
        print(f"  {verdict:10} | {coverage:35} | last crawl: {last_crawl:25} | {url}")
        time.sleep(1)  # stay well under the API's per-minute quota


def main():
    service = get_service()
    resubmit_sitemap(service)
    inspect_urls(service)


if __name__ == "__main__":
    main()
