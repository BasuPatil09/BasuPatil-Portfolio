import {
  Brain, BarChart2, Code2, Globe, Wrench, Cloud, Heart, Trophy, Flag,
  Sparkles, Cpu, Bot, GraduationCap, BookOpen, Layers, ArrowUpRight, ArrowUp,
  ArrowRight, Github, Linkedin, Mail, ExternalLink, Code,
  FolderKanban, BadgeCheck, Target,
} from 'lucide-react'

export const ICONS = {
  brain: Brain,
  'bar-chart-2': BarChart2,
  'code-2': Code2,
  globe: Globe,
  wrench: Wrench,
  cloud: Cloud,
  heart: Heart,
  trophy: Trophy,
  flag: Flag,
  sparkles: Sparkles,
  cpu: Cpu,
  bot: Bot,
  'graduation-cap': GraduationCap,
  'book-open': BookOpen,
  layers: Layers,
  'folder-kanban': FolderKanban,
  'badge-check': BadgeCheck,
  target: Target,
}

export {
  ArrowUpRight, ArrowUp, ArrowRight, Github, Linkedin, Mail, ExternalLink,
  Code,
}

export function Icon({ name, className }) {
  const Cmp = ICONS[name] || Sparkles
  return <Cmp className={className} strokeWidth={1.6} />
}
