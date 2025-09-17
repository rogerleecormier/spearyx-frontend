import { createFileRoute } from '@tanstack/react-router';

import {
  AccentCard,
  AccentText,
  Body,
  BodyLarge,
  Caption,
  Card,
  ComingSoonCard,
  CompactCard,
  ElevatedCard,
  FeatureCard,
  GlassCard,
  Headline,
  Hero,
  HeroCard,
  InfoCard,
  InteractiveCard,
  Label,
  PrimaryAccent,
  PrimaryCard,
  StatsCard,
  SuccessCard,
  SuccessText,
  Title,
  ToolCard,
  WarningCard,
  WarningText,
} from '@/components/brand';
import { Layout } from '@/components/layout';

function CardsGuide() {
  return (
    <Layout isDev={true}>
      <div className="min-h-screen bg-precision-50 py-12 dark:bg-precision-900">
        <div className="container mx-auto max-w-6xl px-4">
          <Hero className="mb-12 text-center">Cards Guide</Hero>

          <div className="space-y-16">
            {/* Basic Cards */}
            <section>
              <Headline className="mb-8">Basic Cards</Headline>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <Title>Standard Card</Title>
                  <Body className="mt-2">
                    Clean and minimal card design with subtle hover effects.
                    Perfect for general content display.
                  </Body>
                  <Caption className="mt-4">Default card styling</Caption>
                </Card>

                <ElevatedCard>
                  <Title>Elevated Card</Title>
                  <Body className="mt-2">
                    More prominent card with stronger shadow. Great for
                    important content that needs emphasis.
                  </Body>
                  <Caption className="mt-4">Enhanced shadow</Caption>
                </ElevatedCard>

                <GlassCard>
                  <Title>Glass Card</Title>
                  <Body className="mt-2">
                    Translucent card with backdrop blur effect. Modern and
                    elegant for overlays.
                  </Body>
                  <Caption className="mt-4">Backdrop blur</Caption>
                </GlassCard>
              </div>
            </section>

            {/* Accent Cards */}
            <section>
              <Headline className="mb-8">Accent Cards</Headline>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <PrimaryCard>
                  <Title>Primary Card</Title>
                  <Body className="mt-2">
                    Brand red accent for primary content.
                  </Body>
                  <Caption className="mt-4">Brand red</Caption>
                </PrimaryCard>

                <AccentCard>
                  <Title>Accent Card</Title>
                  <Body className="mt-2">
                    Professional blue accent for secondary content.
                  </Body>
                  <Caption className="mt-4">Brand blue</Caption>
                </AccentCard>

                <SuccessCard>
                  <Title>Success Card</Title>
                  <Body className="mt-2">
                    Green accent for positive states and success content.
                  </Body>
                  <Caption className="mt-4">Success green</Caption>
                </SuccessCard>

                <WarningCard>
                  <Title>Warning Card</Title>
                  <Body className="mt-2">
                    Yellow accent for caution states and warnings.
                  </Body>
                  <Caption className="mt-4">Warning yellow</Caption>
                </WarningCard>
              </div>
            </section>

            {/* Special Purpose Cards */}
            <section>
              <Headline className="mb-8">Special Purpose Cards</Headline>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FeatureCard>
                  <Title>Feature Card</Title>
                  <Body className="mt-2">
                    Gradient background for showcasing features and highlights.
                    Perfect for feature announcements.
                  </Body>
                  <AccentText className="mt-4 block">
                    Feature highlight
                  </AccentText>
                </FeatureCard>

                <ToolCard>
                  <Title>RACI Generator</Title>
                  <Body className="mt-2">
                    Brand red gradient for project management tools. Creates
                    clear responsibility matrices.
                  </Body>
                  <PrimaryAccent className="mt-4 block">PM Tool</PrimaryAccent>
                </ToolCard>

                <ComingSoonCard>
                  <Title>Risk Assessment Tool</Title>
                  <Body className="mt-2">
                    Special styling for upcoming features with "Coming Soon"
                    badge. Builds anticipation for new releases.
                  </Body>
                  <AccentText className="mt-4 block">In development</AccentText>
                </ComingSoonCard>
              </div>
            </section>

            {/* Hero and Stats Cards */}
            <section>
              <Headline className="mb-8">Hero and Stats Cards</Headline>
              <div className="space-y-6">
                <HeroCard>
                  <div className="text-center">
                    <Hero>Spearyx Precision Tools</Hero>
                    <BodyLarge className="mx-auto mt-4 max-w-2xl">
                      The future of project management is here. AI-augmented
                      tools that just work, without the complexity of
                      traditional PM suites.
                    </BodyLarge>
                    <div className="mt-8 flex justify-center gap-4">
                      <PrimaryAccent>Early Access Q4 2025</PrimaryAccent>
                      <AccentText>Full Release Q1 2026</AccentText>
                    </div>
                  </div>
                </HeroCard>

                <div className="grid gap-6 md:grid-cols-3">
                  <StatsCard>
                    <Title className="text-4xl font-bold">12+</Title>
                    <Body>PM Tools</Body>
                    <Caption className="mt-2">Comprehensive suite</Caption>
                  </StatsCard>

                  <StatsCard>
                    <Title className="text-4xl font-bold">AI</Title>
                    <Body>Augmented</Body>
                    <Caption className="mt-2">Smart automation</Caption>
                  </StatsCard>

                  <StatsCard>
                    <Title className="text-4xl font-bold">100%</Title>
                    <Body>Precision</Body>
                    <Caption className="mt-2">Accuracy focused</Caption>
                  </StatsCard>
                </div>
              </div>
            </section>

            {/* Utility Cards */}
            <section>
              <Headline className="mb-8">Utility Cards</Headline>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <InfoCard>
                  <Title>Info Card</Title>
                  <Body className="mt-2">
                    Blue gradient for informational content and tips. Great for
                    help text and guidance.
                  </Body>
                  <Caption className="mt-4">Informational</Caption>
                </InfoCard>

                <CompactCard>
                  <Title>Compact Card</Title>
                  <Body className="mt-2">
                    Reduced padding for dense content layouts.
                  </Body>
                  <Caption className="mt-4">Space efficient</Caption>
                </CompactCard>

                <InteractiveCard>
                  <Title>Interactive Card</Title>
                  <Body className="mt-2">
                    Enhanced hover effects with scaling and glow. Perfect for
                    clickable content.
                  </Body>
                  <Caption className="mt-4">Enhanced interactions</Caption>
                </InteractiveCard>
              </div>
            </section>

            {/* Card Combinations */}
            <section>
              <Headline className="mb-8">Card Combinations</Headline>
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <ToolCard>
                    <div className="flex items-start justify-between">
                      <div>
                        <Title>Project Charter Generator</Title>
                        <Body className="mt-2">
                          Create comprehensive project charters with AI
                          assistance.
                        </Body>
                        <PrimaryAccent className="mt-4 block">
                          Available Now
                        </PrimaryAccent>
                      </div>
                    </div>
                  </ToolCard>

                  <ComingSoonCard>
                    <div className="flex items-start justify-between">
                      <div>
                        <Title>Resource Planning Tool</Title>
                        <Body className="mt-2">
                          Advanced resource allocation and capacity planning.
                        </Body>
                        <AccentText className="mt-4 block">
                          Coming Soon
                        </AccentText>
                      </div>
                    </div>
                  </ComingSoonCard>
                </div>

                <ElevatedCard>
                  <div className="text-center">
                    <Title>Target Audience</Title>
                    <BodyLarge className="mt-4">
                      Project managers, team leads, and organizations seeking
                      precision tools that deliver results without complexity.
                    </BodyLarge>
                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                      <div className="text-center">
                        <SuccessText className="text-2xl font-bold">
                          Project Managers
                        </SuccessText>
                        <Caption>Streamline workflows</Caption>
                      </div>
                      <div className="text-center">
                        <AccentText className="text-2xl font-bold">
                          Team Leads
                        </AccentText>
                        <Caption>Improve collaboration</Caption>
                      </div>
                      <div className="text-center">
                        <PrimaryAccent className="text-2xl font-bold">
                          Organizations
                        </PrimaryAccent>
                        <Caption>Scale efficiently</Caption>
                      </div>
                    </div>
                  </div>
                </ElevatedCard>
              </div>
            </section>

            {/* Usage Guidelines */}
            <section>
              <Headline className="mb-8">Usage Guidelines</Headline>
              <Card>
                <div className="space-y-6">
                  <Title>Card Design Best Practices</Title>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <Label className="text-success-600">Recommended:</Label>
                      <ul className="mt-2 space-y-1 text-sm text-precision-700 dark:text-precision-300">
                        <li>• Use HeroCard for main page content</li>
                        <li>• ToolCard for PM tool features</li>
                        <li>• ComingSoonCard for upcoming features</li>
                        <li>• Consistent spacing and alignment</li>
                        <li>• Clear visual hierarchy</li>
                      </ul>
                    </div>
                    <div>
                      <Label className="text-primary-600">Avoid:</Label>
                      <ul className="mt-2 space-y-1 text-sm text-precision-700 dark:text-precision-300">
                        <li>• Too many accent colors in one view</li>
                        <li>• Cards without clear purpose</li>
                        <li>• Inconsistent card sizes</li>
                        <li>• Overusing interactive effects</li>
                        <li>• Poor content hierarchy</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-precision-200 pt-6 dark:border-precision-700">
                    <Label>Color Usage:</Label>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                      <div>
                        <PrimaryAccent>Red (Primary)</PrimaryAccent>
                        <Caption>Main brand, tools, CTAs</Caption>
                      </div>
                      <div>
                        <AccentText>Blue (Accent)</AccentText>
                        <Caption>Secondary actions, info</Caption>
                      </div>
                      <div>
                        <SuccessText>Green (Success)</SuccessText>
                        <Caption>Positive states, stats</Caption>
                      </div>
                      <div>
                        <WarningText>Yellow (Warning)</WarningText>
                        <Caption>Caution, alerts</Caption>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const Route = createFileRoute('/cards-guide')({
  component: CardsGuide,
});
