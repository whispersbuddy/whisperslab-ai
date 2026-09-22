import {
  BookOpen,
  Briefcase,
  Building2,
  Calculator,
  ClipboardCheck,
  FileText,
  Gauge,
  Hammer,
  Home,
  House,
  Info,
  Layers,
  Mail,
  MessageSquareReply,
  Plug,
  Receipt,
  Scale,
  ScanText,
  Shield,
  ShoppingCart,
  Table2,
  TrendingUp,
  UserPlus,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/routes";

const ICONS: Record<IconName, LucideIcon> = {
  home: Home,
  scanText: ScanText,
  calculator: Calculator,
  userPlus: UserPlus,
  messageReply: MessageSquareReply,
  plug: Plug,
  table: Table2,
  workflow: Workflow,
  zap: Zap,
  scale: Scale,
  house: House,
  shoppingCart: ShoppingCart,
  building: Building2,
  receipt: Receipt,
  clipboardCheck: ClipboardCheck,
  hammer: Hammer,
  trendingUp: TrendingUp,
  fileText: FileText,
  gauge: Gauge,
  briefcase: Briefcase,
  info: Info,
  mail: Mail,
  shield: Shield,
  bookOpen: BookOpen,
  layers: Layers,
};

export default function SiteIcon({ name, size = 18, className }: { name?: IconName; size?: number; className?: string }) {
  if (!name) return null;
  const Icon = ICONS[name];
  return <Icon size={size} strokeWidth={1.8} className={className} aria-hidden="true" />;
}
