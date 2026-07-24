import type { ComponentType } from 'react';
import {
  Workflow,
  BarChart3,
  ShieldCheck,
  Blocks,
  Users,
  Bot,
  Zap,
  Lock,
  Plug,
  LineChart,
  Clock,
  Check,
  Sparkles,
  Globe,
  Cpu,
  Layers,
  GitBranch,
  Target,
  TrendingUp,
  Palette,
  Headphones,
  type LucideProps,
} from 'lucide-react';
import type { IconName } from '@/types';

const MAP: Record<IconName, ComponentType<LucideProps>> = {
  workflow: Workflow,
  analytics: BarChart3,
  security: ShieldCheck,
  integrations: Blocks,
  collaboration: Users,
  automation: Bot,
  speed: Zap,
  shield: Lock,
  plug: Plug,
  chart: LineChart,
  users: Users,
  bolt: Zap,
  clock: Clock,
  check: Check,
  sparkles: Sparkles,
  globe: Globe,
  lock: Lock,
  cpu: Cpu,
  layers: Layers,
  'git-branch': GitBranch,
  target: Target,
  'trending-up': TrendingUp,
  palette: Palette,
  headphones: Headphones,
};

interface IconProps extends LucideProps {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const Cmp = MAP[name] ?? Sparkles;
  return <Cmp {...props} />;
}
