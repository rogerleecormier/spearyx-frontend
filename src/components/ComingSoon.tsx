import {
    AccentText,
    Body,
    BodyLarge,
    Caption,
    ComingSoonCard,
    Display,
    FeatureCard,
    Headline,
    HeroCard,
    InfoCard,
    Logo,
    PrimaryAccent,
    StatsCard,
    SuccessText,
    Title,
    ToolCard,
} from '@/components/brand';
import { Button } from '@/components/ui/button';

export function ComingSoon() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Light gradient background */}
      <section className="dark:to-precision-850 relative bg-gradient-to-br from-precision-50 via-white to-precision-100 dark:from-precision-900 dark:via-precision-800">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50/30 via-transparent to-accent-50/30 dark:from-primary-900/20 dark:via-transparent dark:to-accent-900/20"></div>
        <div className="container relative mx-auto px-4 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex justify-center">
              <Logo size="xl" showText={false} />
            </div>

            <Display className="mb-8 text-precision-700 dark:text-precision-300">
              Precision PM Tools
            </Display>

            <BodyLarge className="mx-auto mb-12 max-w-2xl text-precision-600 dark:text-precision-400">
              The future of project management is here. AI-augmented tools that
              just work, without the complexity of traditional PM suites like
              Jira or Asana.
            </BodyLarge>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="btn-primary">
                Join Early Access
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Clean white background */}
      <section className="bg-white dark:bg-precision-900">
        <div className="container mx-auto px-4 py-20">
          <div className="mb-16 text-center">
            <Headline className="mb-4">What Makes Spearyx Different</Headline>
            <Body className="mx-auto max-w-2xl text-precision-600 dark:text-precision-400">
              Our tools are designed with precision and clarity in mind, helping
              project managers deliver results efficiently without getting lost
              in complexity.
            </Body>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/20">
                  <svg
                    className="h-6 w-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <Title>AI-Augmented</Title>
                <Body className="mt-2">
                  Smart automation and intelligent suggestions to streamline
                  your workflow.
                </Body>
              </div>
            </FeatureCard>

            <FeatureCard>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-100 dark:bg-accent-900/20">
                  <svg
                    className="h-6 w-6 text-accent-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <Title>Precision Focused</Title>
                <Body className="mt-2">
                  Every tool is designed for accuracy, clarity, and professional
                  results.
                </Body>
              </div>
            </FeatureCard>

            <FeatureCard>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-success-100 dark:bg-success-900/20">
                  <svg
                    className="h-6 w-6 text-success-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    />
                  </svg>
                </div>
                <Title>Simple & Effective</Title>
                <Body className="mt-2">
                  No complex setups or overwhelming features. Just tools that
                  work.
                </Body>
              </div>
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Tools Section - Light grey background with subtle gradient */}
      <section className="dark:from-precision-850 dark:to-precision-850 relative bg-gradient-to-br from-precision-50 via-precision-100/50 to-precision-50 dark:via-precision-800">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-50/20 via-transparent to-primary-50/20 dark:from-accent-900/10 dark:via-transparent dark:to-primary-900/10"></div>
        <div className="container relative mx-auto px-4 py-20">
          <div className="mb-16 text-center">
            <Headline className="mb-4">
              Coming Soon: Essential PM Tools
            </Headline>
            <Body className="mx-auto max-w-2xl text-precision-600 dark:text-precision-400">
              A comprehensive suite of project management tools designed for
              modern teams.
            </Body>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ToolCard>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <Title>RACI Matrix Generator</Title>
                  <Body className="mt-2">
                    Create clear responsibility matrices with AI-powered
                    suggestions for optimal team structure.
                  </Body>
                  <PrimaryAccent className="mt-4 block">
                    Available Q4 2025
                  </PrimaryAccent>
                </div>
              </div>
            </ToolCard>

            <ComingSoonCard>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <Title>Project Charter Builder</Title>
                  <Body className="mt-2">
                    Generate comprehensive project charters with structured
                    templates and smart recommendations.
                  </Body>
                  <AccentText className="mt-4 block">In Development</AccentText>
                </div>
              </div>
            </ComingSoonCard>

            <ComingSoonCard>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <Title>Risk Assessment Tool</Title>
                  <Body className="mt-2">
                    Identify and mitigate project risks with intelligent
                    analysis and mitigation strategies.
                  </Body>
                  <AccentText className="mt-4 block">Coming Soon</AccentText>
                </div>
              </div>
            </ComingSoonCard>

            <ComingSoonCard>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <Title>Resource Planning</Title>
                  <Body className="mt-2">
                    Advanced resource allocation and capacity planning with
                    real-time insights.
                  </Body>
                  <AccentText className="mt-4 block">In Development</AccentText>
                </div>
              </div>
            </ComingSoonCard>

            <ComingSoonCard>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <Title>Stakeholder Mapping</Title>
                  <Body className="mt-2">
                    Visualize stakeholder relationships and communication
                    strategies for better engagement.
                  </Body>
                  <AccentText className="mt-4 block">Coming Soon</AccentText>
                </div>
              </div>
            </ComingSoonCard>

            <ComingSoonCard>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <Title>Progress Tracking</Title>
                  <Body className="mt-2">
                    Real-time project progress monitoring with intelligent
                    milestone tracking.
                  </Body>
                  <AccentText className="mt-4 block">In Development</AccentText>
                </div>
              </div>
            </ComingSoonCard>
          </div>
        </div>
      </section>

      {/* Target Audience Section - Clean white background */}
      <section className="bg-white dark:bg-precision-900">
        <div className="container mx-auto px-4 py-20">
          <div className="mb-16 text-center">
            <Headline className="mb-4">Built for Modern Project Teams</Headline>
            <Body className="mx-auto max-w-2xl text-precision-600 dark:text-precision-400">
              Spearyx is designed for project managers, team leads, and
              organizations seeking precision tools that deliver results without
              complexity.
            </Body>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <InfoCard>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/20">
                  <svg
                    className="h-8 w-8 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <Title>Project Managers</Title>
                <Body className="mt-2">
                  Streamline workflows and deliver projects on time with
                  precision tools designed for efficiency.
                </Body>
              </div>
            </InfoCard>

            <InfoCard>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-100 dark:bg-accent-900/20">
                  <svg
                    className="h-8 w-8 text-accent-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <Title>Team Leads</Title>
                <Body className="mt-2">
                  Improve collaboration and team coordination with tools that
                  enhance communication and clarity.
                </Body>
              </div>
            </InfoCard>

            <InfoCard>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 dark:bg-success-900/20">
                  <svg
                    className="h-8 w-8 text-success-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <Title>Organizations</Title>
                <Body className="mt-2">
                  Scale efficiently across teams and departments with
                  enterprise-ready project management solutions.
                </Body>
              </div>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* CTA Section - Dramatic gradient background */}
      <section className="dark:from-precision-850 dark:to-precision-850 relative bg-gradient-to-br from-precision-100 via-precision-50 to-precision-100 dark:via-precision-900">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50/40 via-accent-50/30 to-primary-50/40 dark:from-primary-900/30 dark:via-accent-900/20 dark:to-primary-900/30"></div>
        <div className="container relative mx-auto px-4 py-24">
          <HeroCard>
            <div className="text-center">
              <Title className="mb-6">
                Ready to Transform Your Project Management?
              </Title>
              <BodyLarge className="mx-auto mb-8 max-w-2xl">
                Join our exclusive early access program and be among the first
                to experience the future of project management tools.
              </BodyLarge>

              <div className="mb-8 grid gap-8 md:grid-cols-2">
                <StatsCard>
                  <SuccessText className="text-3xl font-bold">
                    Q4 2025
                  </SuccessText>
                  <Body>Early Access Launch</Body>
                  <Caption className="mt-2">Limited spots available</Caption>
                </StatsCard>

                <StatsCard>
                  <AccentText className="text-3xl font-bold">
                    Q1 2026
                  </AccentText>
                  <Body>Full Release</Body>
                  <Caption className="mt-2">Complete feature set</Caption>
                </StatsCard>
              </div>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" className="btn-primary">
                  Join Early Access
                </Button>
                <Button size="lg" variant="outline" className="btn-secondary">
                  Get Notified
                </Button>
              </div>

              <Caption className="mt-6 text-precision-500 dark:text-precision-500">
                Be the first to experience precision project management tools
                that just work.
              </Caption>
            </div>
          </HeroCard>
        </div>
      </section>
    </div>
  );
}
