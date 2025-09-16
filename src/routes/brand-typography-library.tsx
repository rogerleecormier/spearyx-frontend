import { createFileRoute } from '@tanstack/react-router';

import {
  CommandDirective,
  FieldReport,
  IntelligenceBrief,
  MissionBriefing,
  OperationalTitle,
  StatusIndicator,
  StrategicBody,
  TacticalHeading,
  TypographyShowcase,
} from '../components/BrandTypography';
import { Logo } from '../components/logo';

export const Route = createFileRoute('/brand-typography-library')({
  component: BrandTypographyLibrary,
});

function BrandTypographyLibrary() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-strategic-950 via-strategic-900 to-strategic-950">
      <div className="container mx-auto px-platoon py-army">
        <div className="mx-auto max-w-7xl space-y-army">
          {/* Header */}
          <div className="space-y-platoon text-center">
            <div className="flex justify-center">
              <div className="relative">
                <Logo size={120} className="text-command-400" />
                <div className="absolute -inset-4 animate-pulse rounded-full bg-command-600/10 blur-xl" />
              </div>
            </div>

            <div className="space-y-squad">
              <h1 className="bg-gradient-to-r from-command-400 via-tactical-400 to-command-600 bg-clip-text text-mission-briefing font-black text-transparent">
                SPEARYX TYPOGRAPHY
              </h1>
              <p className="mx-auto max-w-4xl text-operational-title text-strategic-200">
                Precision-engineered typography system for project management
                excellence. Laser-focused text hierarchy delivering tactical
                clarity and strategic precision.
              </p>
            </div>
          </div>

          {/* Typography Scale Overview */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="mb-squad text-tactical-heading font-bold text-command-200">
                TYPOGRAPHY SCALE
              </h2>
              <div className="mx-auto h-squad w-24 rounded-full bg-gradient-to-r from-command-400 to-command-600" />
            </div>

            <div className="grid grid-cols-1 gap-platoon md:grid-cols-2">
              {/* Mission-Critical Typography */}
              <div className="space-y-squad">
                <h3 className="text-operational-title font-semibold text-tactical-200">
                  MISSION-CRITICAL TYPOGRAPHY
                </h3>
                <div className="space-y-squad">
                  <div className="overflow-hidden rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-8">
                    <div className="mb-squad font-mono text-xs text-strategic-400">
                      Mission Briefing
                    </div>
                    <MissionBriefing>TARGET ACQUIRED</MissionBriefing>
                    <div className="mt-squad text-xs text-strategic-400">
                      Maximum impact hero text
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-8">
                    <div className="mb-squad font-mono text-xs text-strategic-400">
                      Command Directive
                    </div>
                    <CommandDirective>EXECUTION PARAMETERS</CommandDirective>
                    <div className="mt-squad text-xs text-strategic-400">
                      Authoritative section headers
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-8">
                    <div className="mb-squad font-mono text-xs text-strategic-400">
                      Tactical Heading
                    </div>
                    <TacticalHeading>Operational Overview</TacticalHeading>
                    <div className="mt-squad text-xs text-strategic-400">
                      Section headers with tactical emphasis
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-8">
                    <div className="mb-squad font-mono text-xs text-strategic-400">
                      Operational Title
                    </div>
                    <OperationalTitle>Project Control Center</OperationalTitle>
                    <div className="mt-squad text-xs text-strategic-400">
                      Component titles and feature names
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategic Content Typography */}
              <div className="space-y-squad">
                <h3 className="text-operational-title font-semibold text-strategic-200">
                  STRATEGIC CONTENT TYPOGRAPHY
                </h3>
                <div className="space-y-squad">
                  <div className="overflow-hidden rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-8">
                    <div className="mb-squad font-mono text-xs text-strategic-400">
                      Strategic Body
                    </div>
                    <StrategicBody>
                      Precision-engineered microtools for project management
                      excellence with advanced pattern recognition.
                    </StrategicBody>
                    <div className="mt-squad text-xs text-strategic-400">
                      Primary content with strategic tone
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-8">
                    <div className="mb-squad font-mono text-xs text-strategic-400">
                      Field Report
                    </div>
                    <FieldReport>
                      Advanced pattern recognition and predictive insights for
                      superior decision-making in complex environments.
                    </FieldReport>
                    <div className="mt-squad text-xs text-strategic-400">
                      Standard body text for detailed content
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-8">
                    <div className="mb-squad font-mono text-xs text-strategic-400">
                      Intelligence Brief
                    </div>
                    <IntelligenceBrief>
                      Real-time analytics and KPI tracking with intelligent
                      alerts for proactive issue resolution.
                    </IntelligenceBrief>
                    <div className="mt-squad text-xs text-strategic-400">
                      Secondary content and detailed information
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-8">
                    <div className="mb-squad font-mono text-xs text-strategic-400">
                      Status Indicator
                    </div>
                    <StatusIndicator>ACTIVE MISSION</StatusIndicator>
                    <div className="mt-squad text-xs text-strategic-400">
                      Labels, badges, and status information
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Comprehensive Typography Showcase */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="mb-squad text-tactical-heading font-bold text-tactical-200">
                COMPREHENSIVE TYPOGRAPHY SHOWCASE
              </h2>
              <div className="mx-auto h-squad w-24 rounded-full bg-gradient-to-r from-tactical-400 to-tactical-600" />
            </div>

            <div className="rounded-2xl border border-strategic-800/30 bg-strategic-950/50 p-8">
              <TypographyShowcase />
            </div>
          </section>

          {/* Usage Examples */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="mb-squad text-tactical-heading font-bold text-strategic-200">
                USAGE EXAMPLES
              </h2>
              <div className="mx-auto h-squad w-24 rounded-full bg-gradient-to-r from-strategic-400 to-strategic-600" />
            </div>

            <div className="grid grid-cols-1 gap-platoon md:grid-cols-2 lg:grid-cols-3">
              {/* Hero Section Example */}
              <div className="space-y-squad">
                <h3 className="mb-squad text-operational-title font-semibold text-tactical-200">
                  HERO SECTIONS
                </h3>
                <div className="space-y-squad overflow-hidden rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-8">
                  <div className="block">
                    <MissionBriefing className="block">
                      SPEARYX SUITE
                    </MissionBriefing>
                  </div>
                  <div className="block">
                    <CommandDirective className="block">
                      TACTICAL ARSENAL
                    </CommandDirective>
                  </div>
                  <div className="block">
                    <StrategicBody className="block">
                      Precision-engineered microtools for project leaders who
                      demand tactical clarity.
                    </StrategicBody>
                  </div>
                </div>
              </div>

              {/* Card Content Example */}
              <div className="space-y-squad">
                <h3 className="mb-squad text-operational-title font-semibold text-strategic-200">
                  CARD CONTENT
                </h3>
                <div className="space-y-squad overflow-hidden rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-8">
                  <div className="block">
                    <OperationalTitle className="block">
                      Project Charter
                    </OperationalTitle>
                  </div>
                  <div className="block">
                    <FieldReport className="block">
                      AI-guided mission parameters with precision-defined
                      objectives and success metrics.
                    </FieldReport>
                  </div>
                  <div className="flex items-center gap-squad">
                    <StatusIndicator className="block">ACTIVE</StatusIndicator>
                    <IntelligenceBrief className="block">
                      High Priority
                    </IntelligenceBrief>
                  </div>
                </div>
              </div>

              {/* Dashboard Example */}
              <div className="space-y-squad">
                <h3 className="mb-squad text-operational-title font-semibold text-command-200">
                  DASHBOARD ELEMENTS
                </h3>
                <div className="space-y-squad overflow-hidden rounded-lg border border-strategic-800/30 bg-strategic-950/50 p-8">
                  <div className="block">
                    <TacticalHeading className="block">
                      Performance Metrics
                    </TacticalHeading>
                  </div>
                  <div className="grid grid-cols-2 gap-squad">
                    <div className="block text-center">
                      <div className="mb-squad text-2xl font-bold text-command-300">
                        99.9%
                      </div>
                      <IntelligenceBrief className="block">
                        Uptime
                      </IntelligenceBrief>
                    </div>
                    <div className="block text-center">
                      <div className="mb-squad text-2xl font-bold text-tactical-300">
                        2.3ms
                      </div>
                      <IntelligenceBrief className="block">
                        Response Time
                      </IntelligenceBrief>
                    </div>
                  </div>
                  <div className="block">
                    <StatusIndicator className="block">
                      OPTIMAL PERFORMANCE
                    </StatusIndicator>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Typography Guidelines */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="mb-squad text-tactical-heading font-bold text-command-200">
                TYPOGRAPHY GUIDELINES
              </h2>
              <div className="mx-auto h-squad w-24 rounded-full bg-gradient-to-r from-command-400 to-command-600" />
            </div>

            <div className="grid grid-cols-1 gap-platoon md:grid-cols-2">
              <div className="rounded-2xl border border-strategic-200/30 bg-strategic-950/50 p-8">
                <h3 className="mb-company text-operational-title font-semibold text-command-200">
                  HIERARCHY PRINCIPLES
                </h3>
                <ul className="space-y-squad text-field-report text-strategic-300">
                  <li>
                    • Use Mission Briefing for maximum impact (heroes, major
                    announcements)
                  </li>
                  <li>• Command Directive for authoritative section headers</li>
                  <li>• Tactical Heading for major section divisions</li>
                  <li>• Operational Title for component and card titles</li>
                  <li>• Strategic Body for primary content and descriptions</li>
                  <li>• Field Report for standard body text and details</li>
                  <li>
                    • Intelligence Brief for secondary content and metadata
                  </li>
                  <li>
                    • Status Indicator for labels, badges, and status
                    information
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-strategic-200/30 bg-strategic-950/50 p-8">
                <h3 className="mb-company text-operational-title font-semibold text-tactical-200">
                  IMPLEMENTATION RULES
                </h3>
                <ul className="space-y-squad text-field-report text-strategic-300">
                  <li>• Maintain consistent color usage with brand palette</li>
                  <li>• Use appropriate font weights for visual hierarchy</li>
                  <li>• Ensure proper line-height for readability</li>
                  <li>• Apply letter-spacing for emphasis and clarity</li>
                  <li>• Use text-transform for status indicators and labels</li>
                  <li>
                    • Consider responsive scaling for different screen sizes
                  </li>
                  <li>• Maintain contrast ratios for accessibility</li>
                  <li>• Use semantic HTML elements when possible</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-strategic-200/30 bg-strategic-950/50 p-8">
                <h3 className="mb-company text-operational-title font-semibold text-strategic-200">
                  ACCESSIBILITY CONSIDERATIONS
                </h3>
                <ul className="space-y-squad text-field-report text-strategic-300">
                  <li>• All text maintains 4.5:1 contrast ratio minimum</li>
                  <li>
                    • Font sizes scale responsively for different viewports
                  </li>
                  <li>• Line heights provide adequate reading comfort</li>
                  <li>• Letter spacing improves character distinction</li>
                  <li>• Color choices work for color-blind users</li>
                  <li>• Text remains readable at all zoom levels</li>
                  <li>• Focus states are clearly visible</li>
                  <li>• Screen reader compatibility maintained</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-strategic-200/30 bg-strategic-950/50 p-8">
                <h3 className="mb-company text-operational-title font-semibold text-command-200">
                  PERFORMANCE OPTIMIZATION
                </h3>
                <ul className="space-y-squad text-field-report text-strategic-300">
                  <li>
                    • Use Tailwind's utility classes for optimal CSS generation
                  </li>
                  <li>• Minimize custom font loading for faster page loads</li>
                  <li>
                    • Leverage CSS custom properties for theme consistency
                  </li>
                  <li>
                    • Implement font-display: swap for better loading experience
                  </li>
                  <li>• Use system font stacks for improved performance</li>
                  <li>• Optimize font subsets for reduced file sizes</li>
                  <li>• Cache fonts appropriately for repeat visits</li>
                  <li>• Monitor Core Web Vitals for typography impact</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Code Examples */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="mb-squad text-tactical-heading font-bold text-tactical-200">
                CODE EXAMPLES
              </h2>
              <div className="mx-auto h-squad w-24 rounded-full bg-gradient-to-r from-tactical-400 to-tactical-600" />
            </div>

            <div className="grid grid-cols-1 gap-platoon">
              <div className="rounded-2xl border border-strategic-200/30 bg-strategic-950/50 p-8">
                <h3 className="mb-company text-operational-title font-semibold text-strategic-200">
                  COMPONENT USAGE
                </h3>
                <div className="space-y-squad">
                  <div className="overflow-hidden rounded-lg bg-strategic-900/50 p-squad">
                    <div className="mb-squad font-mono text-sm text-command-300">
                      Using Specialized Components
                    </div>
                    <pre className="overflow-x-auto text-xs text-strategic-300">
                      {`<MissionBriefing>SPEARYX SUITE</MissionBriefing>
<CommandDirective>TACTICAL ARSENAL</CommandDirective>
<OperationalTitle>Project Charter</OperationalTitle>
<StrategicBody>Advanced AI-powered insights...</StrategicBody>`}
                    </pre>
                  </div>

                  <div className="overflow-hidden rounded-lg bg-strategic-900/50 p-squad">
                    <div className="mb-squad font-mono text-sm text-command-300">
                      Using Generic Component with Variants
                    </div>
                    <pre className="overflow-x-auto text-xs text-strategic-300">
                      {`<BrandTypography variant="mission-briefing">
  TARGET ACQUIRED
</BrandTypography>
<BrandTypography variant="strategic-body">
  Precision-engineered microtools...
</BrandTypography>`}
                    </pre>
                  </div>

                  <div className="overflow-hidden rounded-lg bg-strategic-900/50 p-squad">
                    <div className="mb-squad font-mono text-sm text-command-300">
                      Using Tailwind Classes Directly
                    </div>
                    <pre className="overflow-x-auto text-xs text-strategic-300">
                      {`<h1 className="text-mission-briefing text-command-100 font-black">
  SPEARYX SUITE
</h1>
<p className="text-strategic-body text-strategic-200">
  Advanced AI-powered insights...
</p>`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default BrandTypographyLibrary;
