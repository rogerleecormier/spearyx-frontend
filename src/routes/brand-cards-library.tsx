import {
    AlertCard,
    CommandCard,
    FeaturedHeroCard,
    GlassCard,
    HeroCard,
    IntelligenceCard,
    MissionCard,
    StatsCard,
    StrategicCard,
    TacticalCard
} from '@/components/BrandCards';
import { Logo } from '@/components/logo';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/brand-cards-library')({
  component: BrandCardsLibrary,
});

function BrandCardsLibrary() {
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
            <h1 className="mission-briefing font-black bg-gradient-to-r from-command-400 via-tactical-400 to-command-600 bg-clip-text text-transparent">
              SPEARYX BRAND CARDS
            </h1>
            <p className="operational-title text-strategic-200 max-w-4xl mx-auto">
              Precision-engineered card system for project management excellence.
              Laser-focused components delivering tactical clarity and strategic precision.
            </p>
            </div>
          </div>

          {/* Command Cards Section */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="operational-title font-bold text-command-200 mb-squad">
                COMMAND CARDS
              </h2>
              <div className="mx-auto w-24 h-squad bg-gradient-to-r from-command-400 to-command-600 rounded-full" />
            </div>

            <div className="grid grid-cols-1 gap-platoon md:grid-cols-2 lg:grid-cols-3">
              <CommandCard
                title="Project Control Center"
                description="Central command hub for project oversight, resource allocation, and strategic decision-making with precision targeting."
                status="active"
                metrics={[
                  { label: "Active Projects", value: "24/24" },
                  { label: "On-Time Delivery", value: "99.9%" }
                ]}
              />

              <CommandCard
                title="Performance Monitoring"
                description="Real-time analytics and KPI tracking with intelligent alerts for proactive issue resolution and clarity optimization."
                status="active"
                metrics={[
                  { label: "Coverage", value: "87%" },
                  { label: "Risk Alerts", value: "12" }
                ]}
              />

              <CommandCard
                title="Team Communication"
                description="Secure collaboration platform with encrypted channels and crystal-clear communication for precision execution."
                status="standby"
                metrics={[
                  { label: "Active Channels", value: "18/20" },
                  { label: "Response Time", value: "<2.3s" }
                ]}
              />
            </div>
          </section>

          {/* Tactical Cards Section */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="operational-title font-bold text-tactical-200 mb-squad">
                TACTICAL CARDS
              </h2>
              <div className="mx-auto w-24 h-squad bg-gradient-to-r from-tactical-400 to-tactical-600 rounded-full" />
            </div>

            <div className="grid grid-cols-1 gap-platoon md:grid-cols-2 lg:grid-cols-3">
              <TacticalCard
                title="Product Launch Initiative"
                objective="Execute precision deployment targeting market penetration and competitive advantage capture."
                threatLevel="high"
                progress={75}
                team="Launch Squadron"
              />

              <TacticalCard
                title="Market Analysis Campaign"
                objective="Conduct comprehensive competitor intelligence gathering and market trend analysis for strategic positioning."
                threatLevel="medium"
                progress={45}
                team="Intelligence Unit"
              />

              <TacticalCard
                title="Crisis Management Protocol"
                objective="Implement emergency response framework targeting risk mitigation and stakeholder communication clarity."
                threatLevel="critical"
                progress={90}
                team="Rapid Response Team"
              />
            </div>
          </section>

          {/* Strategic Cards Section */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="operational-title font-bold text-strategic-200 mb-squad">
                STRATEGIC CARDS
              </h2>
              <div className="mx-auto w-24 h-squad bg-gradient-to-r from-strategic-400 to-strategic-600 rounded-full" />
            </div>

            <div className="grid grid-cols-1 gap-platoon md:grid-cols-2">
              <StrategicCard
                title="Enterprise Portfolio Strategy"
                overview="Comprehensive strategic planning for multi-year product development and market expansion initiatives targeting sustainable growth."
                priority="critical"
                deadline="Q2 2025"
                stakeholders={["Executive Board", "Product Leadership", "Engineering Teams"]}
              />

              <StrategicCard
                title="Resource Optimization Initiative"
                overview="Strategic assessment and intelligent reallocation of budget and talent resources for maximum ROI and competitive advantage."
                priority="high"
                deadline="Q1 2025"
                stakeholders={["Finance Division", "HR Leadership"]}
              />
            </div>
          </section>

          {/* Intelligence Cards Section */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="operational-title font-bold text-strategic-200 mb-squad">
                INTELLIGENCE CARDS
              </h2>
              <div className="mx-auto w-24 h-squad bg-gradient-to-r from-strategic-400 to-strategic-600 rounded-full" />
            </div>

            <div className="grid grid-cols-1 gap-platoon md:grid-cols-2">
              <IntelligenceCard
                title="Market Intelligence Report"
                briefing="High-resolution market analysis reveals emerging competitor positioning in sector 12. Strategic response planning initiated."
                status="warning"
                source="Competitive Intelligence"
                timestamp="2 hours ago"
              />

              <IntelligenceCard
                title="Performance Analytics Update"
                briefing="KPI tracking systems detected significant improvement in project delivery metrics. Optimization protocols activated successfully."
                status="success"
                source="Analytics Center"
                timestamp="15 minutes ago"
              />

              <IntelligenceCard
                title="Trend Analysis Briefing"
                briefing="Market data indicates shifting customer preferences toward remote collaboration tools. Strategic adaptation recommended."
                status="info"
                source="Market Research Division"
                timestamp="1 hour ago"
              />

              <IntelligenceCard
                title="Risk Assessment Alert"
                briefing="Critical path analysis detected potential bottleneck in Q4 delivery schedule. Immediate resource reallocation initiated."
                status="danger"
                source="Risk Management"
                timestamp="5 minutes ago"
              />
            </div>
          </section>

          {/* Mission Cards Section */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="operational-title font-bold text-command-200 mb-squad">
                MISSION CARDS
              </h2>
              <div className="mx-auto w-24 h-squad bg-gradient-to-r from-command-400 to-command-600 rounded-full" />
            </div>

            <div className="grid grid-cols-1 gap-platoon md:grid-cols-2">
              <MissionCard
                missionId="PM-2025-047"
                title="Enterprise Software Launch"
                description="Coordinated cross-functional deployment targeting seamless product rollout with comprehensive testing and user training."
                status="active"
                progress={68}
                assignedTo="Director S. Reynolds"
                priority="high"
              />

              <MissionCard
                missionId="PM-2025-048"
                title="Digital Transformation Initiative"
                description="Comprehensive systems analysis targeting legacy infrastructure modernization and process optimization for competitive advantage."
                status="planned"
                assignedTo="VP T. Alvarez"
                priority="medium"
              />
            </div>
          </section>

          {/* Alert Cards Section */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="operational-title font-bold text-tactical-200 mb-squad">
                ALERT CARDS
              </h2>
              <div className="mx-auto w-24 h-squad bg-gradient-to-r from-tactical-400 to-tactical-600 rounded-full" />
            </div>

            <div className="grid grid-cols-1 gap-platoon">
              <AlertCard
                severity="critical"
                title="Critical Path Disruption"
                message="Primary delivery milestone has experienced significant delay. Contingency protocols activated. Project timeline at risk."
                source="Project Control Center"
                timestamp="08:23:47 UTC"
              />

              <AlertCard
                severity="high"
                title="Resource Conflict Detected"
                message="Critical resource bottleneck identified in development pipeline. Immediate resource reallocation required."
                source="Resource Management"
                timestamp="09:15:22 UTC"
              />

              <AlertCard
                severity="medium"
                title="Stakeholder Escalation Alert"
                message="Executive stakeholder requires immediate project status update. Communication protocol initiated."
                source="Stakeholder Relations"
                timestamp="10:02:18 UTC"
              />
            </div>
          </section>

          {/* Stats Cards Section */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="operational-title font-bold text-strategic-200 mb-squad">
                STATISTICS CARDS
              </h2>
              <div className="mx-auto w-24 h-squad bg-gradient-to-r from-strategic-400 to-strategic-600 rounded-full" />
            </div>

            <div className="grid grid-cols-1 gap-platoon md:grid-cols-2 lg:grid-cols-3">
              <StatsCard
                title="Platform Performance"
                period="Last 24 Hours"
                metrics={[
                  { label: "System Uptime", value: "99.97%", change: "+0.02%", trend: "up" },
                  { label: "Response Time", value: "2.3ms", change: "-0.1ms", trend: "up" }
                ]}
              />

              <StatsCard
                title="Project Delivery Metrics"
                period="Current Quarter"
                metrics={[
                  { label: "On-Time Delivery", value: "94.2%", change: "+2.1%", trend: "up" },
                  { label: "Budget Variance", value: "87.5%", change: "+1.3%", trend: "up" }
                ]}
              />

              <StatsCard
                title="Analytics & Reporting"
                period="Last 7 Days"
                metrics={[
                  { label: "Reports Generated", value: "1,247", change: "+156", trend: "up" },
                  { label: "Risks Mitigated", value: "89", change: "+12", trend: "up" }
                ]}
              />
            </div>
          </section>

          {/* Hero Cards Section */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="operational-title font-bold text-command-200 mb-squad">
                HERO CARDS
              </h2>
              <div className="mx-auto w-24 h-squad bg-gradient-to-r from-command-400 to-command-600 rounded-full" />
            </div>

            <div className="grid grid-cols-1 gap-platoon md:grid-cols-2">
              <HeroCard
                title="PROJECT CONTROL CENTER"
                subtitle="Precision Management Hub"
                description="Centralized command interface for real-time project oversight, performance analytics, and strategic decision-making with laser focus."
                icon="🎯"
                badge="ACTIVE"
                gradient="command"
              />

              <HeroCard
                title="STRATEGIC ANALYTICS"
                subtitle="Predictive Intelligence Engine"
                description="AI-powered data analysis and predictive modeling providing actionable insights for competitive advantage and strategic positioning."
                icon="🧠"
                badge="ENHANCED"
                gradient="tactical"
              />
            </div>
          </section>

          {/* Featured Hero Cards Section */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="operational-title font-bold text-tactical-200 mb-squad">
                FEATURED HERO CARDS
              </h2>
              <div className="mx-auto w-24 h-squad bg-gradient-to-r from-tactical-400 to-tactical-600 rounded-full" />
            </div>

            <div className="grid grid-cols-1 gap-platoon">
              <FeaturedHeroCard
                title="SPEARYX SUITE ENTERPRISE"
                tagline="Complete Project Control Solution"
                description="The ultimate project management platform featuring advanced AI intelligence, real-time analytics, and seamless team collaboration tools designed for precision execution and strategic success."
                features={[
                  "Real-time project tracking and coordination",
                  "Advanced AI-powered decision support",
                  "Secure encrypted communication channels",
                  "Comprehensive analytics and reporting",
                  "Multi-platform deployment support"
                ]}
                metrics={[
                  { label: "Active Projects", value: "247" },
                  { label: "Success Rate", value: "98.7%" },
                  { label: "Response Time", value: "<2ms" },
                  { label: "Uptime", value: "99.99%" }
                ]}
                gradient="command"
              />
            </div>
          </section>

          {/* Glass Cards Section */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="operational-title font-bold text-strategic-200 mb-squad">
                GLASS EFFECT CARDS
              </h2>
              <div className="mx-auto w-24 h-squad bg-gradient-to-r from-strategic-400 to-strategic-600 rounded-full" />
            </div>

            <div className="grid grid-cols-1 gap-platoon md:grid-cols-2">
              <GlassCard
                title="RAPID DEPLOYMENT"
                accent="command"
              >
                <div className="space-y-6">
                  <p className="text-strategic-200 leading-relaxed mb-4">
                    Instant deployment protocols with zero-downtime updates and automatic scaling for seamless project continuity.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-command-500" />
                      <span className="text-sm text-strategic-200">Real-time monitoring active</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-tactical-500" />
                      <span className="text-sm text-strategic-200">Auto-scaling enabled</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-intelligence-success-500" />
                      <span className="text-sm text-strategic-200">Backup systems online</span>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard
                title="TACTICAL ANALYSIS"
                accent="tactical"
              >
                <div className="space-y-6">
                  <p className="text-strategic-200 leading-relaxed mb-4">
                    Advanced pattern recognition and predictive analytics for strategic project insights and competitive advantage.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-tactical-500" />
                      <span className="text-sm text-strategic-200">Risk assessment active</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-command-500" />
                      <span className="text-sm text-strategic-200">Trend analysis running</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-strategic-400" />
                      <span className="text-sm text-strategic-200">Report generation complete</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </section>

          {/* Usage Guidelines */}
          <section className="space-y-platoon">
            <div className="text-center">
              <h2 className="operational-title font-bold text-strategic-200 mb-squad">
                USAGE GUIDELINES
              </h2>
              <div className="mx-auto w-24 h-squad bg-gradient-to-r from-strategic-400 to-strategic-600 rounded-full" />
            </div>

            <div className="grid grid-cols-1 gap-platoon md:grid-cols-2">
              <div className="rounded-2xl border border-strategic-200/30 bg-strategic-950/50 p-platoon">
                <h3 className="tactical-heading font-semibold text-command-200 mb-company">
                  COMMAND CARDS
                </h3>
                <ul className="space-y-squad text-strategic-300">
                  <li>• Use for project dashboards and control interfaces</li>
                  <li>• Perfect for performance monitoring and status displays</li>
                  <li>• Include metrics and KPIs for quick assessment</li>
                  <li>• Command blue theme with precision-focused terminology</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-strategic-200/30 bg-strategic-950/50 p-platoon">
                <h3 className="tactical-heading font-semibold text-tactical-200 mb-company">
                  TACTICAL CARDS
                </h3>
                <ul className="space-y-squad text-strategic-300">
                  <li>• Ideal for sprint planning and agile execution</li>
                  <li>• Include priority levels and progress indicators</li>
                  <li>• Tactical orange theme with precision terminology</li>
                  <li>• Perfect for real-time project updates</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-strategic-200/30 bg-strategic-950/50 p-platoon">
                <h3 className="tactical-heading font-semibold text-strategic-200 mb-company">
                  STRATEGIC CARDS
                </h3>
                <ul className="space-y-squad text-strategic-300">
                  <li>• Best for portfolio planning and resource allocation</li>
                  <li>• Include stakeholder information and deadlines</li>
                  <li>• Strategic gray theme with executive terminology</li>
                  <li>• Use for executive dashboards and strategic reports</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-strategic-200/30 bg-strategic-950/50 p-platoon">
                <h3 className="tactical-heading font-semibold text-strategic-200 mb-company">
                  HERO & SPECIAL VARIANTS
                </h3>
                <ul className="space-y-squad text-strategic-300">
                  <li>• Hero cards for featured content with gradient top borders</li>
                  <li>• Featured hero cards for prominent product showcases</li>
                  <li>• Intelligence cards for data insights and performance alerts</li>
                  <li>• Mission cards for detailed project milestone tracking</li>
                  <li>• Glass cards for premium analytics interfaces</li>
                  <li>• Stats cards for project performance metrics and KPIs</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default BrandCardsLibrary;
