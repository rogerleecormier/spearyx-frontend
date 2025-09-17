import { createFileRoute } from '@tanstack/react-router';

import {
  AccentText,
  Body,
  BodyLarge,
  Caption,
  Card,
  Code,
  Display,
  ElevatedCard,
  GradientText,
  Headline,
  Hero,
  Label,
  MutedText,
  PrimaryAccent,
  Quote,
  SuccessText,
  Title,
  WarningText,
} from '@/components/brand';
import { Layout } from '@/components/layout';

function TypographyGuide() {
  return (
    <Layout isDev={true}>
      <div className="min-h-screen bg-precision-50 py-12 dark:bg-precision-900">
        <div className="container mx-auto max-w-4xl px-4">
          <Hero className="mb-12 text-center">Typography Guide</Hero>

          <div className="space-y-16">
            {/* Main Typography Scale */}
            <section>
              <Headline className="mb-8">Main Typography Scale</Headline>
              <div className="space-y-6">
                <Card>
                  <div className="space-y-2">
                    <Label>Hero - Large Display Text</Label>
                    <Hero>The Future of Project Management</Hero>
                    <Caption>
                      Perfect for landing page headlines and major announcements
                    </Caption>
                  </div>
                </Card>

                <Card>
                  <div className="space-y-2">
                    <Label>Display - Section Headers</Label>
                    <Display>Precision Tools for Modern Teams</Display>
                    <Caption>
                      Ideal for main section headings and page titles
                    </Caption>
                  </div>
                </Card>

                <Card>
                  <div className="space-y-2">
                    <Label>Headline - Subsection Headers</Label>
                    <Headline>Streamline Your Workflow</Headline>
                    <Caption>
                      Great for subsection titles and card headers
                    </Caption>
                  </div>
                </Card>

                <Card>
                  <div className="space-y-2">
                    <Label>Title - Component Titles</Label>
                    <Title>RACI Chart Generator</Title>
                    <Caption>
                      Perfect for card titles and component headers
                    </Caption>
                  </div>
                </Card>

                <Card>
                  <div className="space-y-2">
                    <Label>Body Large - Important Content</Label>
                    <BodyLarge>
                      Spearyx provides AI-augmented project management tools
                      that just work, without the complexity of traditional PM
                      suites.
                    </BodyLarge>
                    <Caption>
                      Use for important body text and key descriptions
                    </Caption>
                  </div>
                </Card>

                <Card>
                  <div className="space-y-2">
                    <Label>Body - Standard Content</Label>
                    <Body>
                      Our tools are designed with precision and clarity in mind,
                      helping project managers deliver results efficiently.
                    </Body>
                    <Caption>Standard body text for most content</Caption>
                  </div>
                </Card>

                <Card>
                  <div className="space-y-2">
                    <Label>Caption - Supporting Text</Label>
                    <Caption>
                      Coming soon in Q4 2025 - Early access program
                    </Caption>
                    <Caption>
                      Use for captions, metadata, and secondary information
                    </Caption>
                  </div>
                </Card>

                <Card>
                  <div className="space-y-2">
                    <Label>Label - Form Labels</Label>
                    <Label>Project Name</Label>
                    <Caption>
                      Perfect for form labels and UI element labels
                    </Caption>
                  </div>
                </Card>
              </div>
            </section>

            {/* Accent Typography */}
            <section>
              <Headline className="mb-8">Accent Typography</Headline>
              <div className="space-y-6">
                <Card>
                  <div className="space-y-2">
                    <Label>Primary Accent - Brand Red</Label>
                    <PrimaryAccent>Spearyx - Precision PM Tools</PrimaryAccent>
                    <Caption>Uses the brand red color for emphasis</Caption>
                  </div>
                </Card>

                <Card>
                  <div className="space-y-2">
                    <Label>Accent Text - Brand Blue</Label>
                    <AccentText>Professional & Reliable</AccentText>
                    <Caption>
                      Uses the brand blue color for secondary emphasis
                    </Caption>
                  </div>
                </Card>

                <Card>
                  <div className="space-y-2">
                    <Label>Success Text - Green</Label>
                    <SuccessText>Project Completed Successfully</SuccessText>
                    <Caption>For positive states and success messages</Caption>
                  </div>
                </Card>

                <Card>
                  <div className="space-y-2">
                    <Label>Warning Text - Yellow</Label>
                    <WarningText>Deadline Approaching</WarningText>
                    <Caption>For caution states and warnings</Caption>
                  </div>
                </Card>

                <Card>
                  <div className="space-y-2">
                    <Label>Muted Text - Subtle</Label>
                    <MutedText>Last updated 2 hours ago</MutedText>
                    <Caption>For subtle, secondary information</Caption>
                  </div>
                </Card>

                <Card>
                  <div className="space-y-2">
                    <Label>Gradient Text - Eye-catching</Label>
                    <GradientText>Spearyx Precision Tools</GradientText>
                    <Caption>Gradient effect for special emphasis</Caption>
                  </div>
                </Card>
              </div>
            </section>

            {/* Special Typography */}
            <section>
              <Headline className="mb-8">Special Typography</Headline>
              <div className="space-y-6">
                <Card>
                  <div className="space-y-2">
                    <Label>Code Text</Label>
                    <Code>npm install @spearyx/pm-tools</Code>
                    <Caption>
                      Monospace font for code snippets and technical content
                    </Caption>
                  </div>
                </Card>

                <Card>
                  <div className="space-y-2">
                    <Label>Quote Text</Label>
                    <Quote>
                      "The best project management tools are the ones that get
                      out of your way and let you focus on what matters most -
                      delivering results."
                    </Quote>
                    <Caption>Styled for quotations and testimonials</Caption>
                  </div>
                </Card>
              </div>
            </section>

            {/* Typography Combinations */}
            <section>
              <Headline className="mb-8">Typography Combinations</Headline>
              <ElevatedCard>
                <div className="space-y-6">
                  <div>
                    <Hero block={false}>Spearyx</Hero>
                    <BodyLarge className="ml-2 inline">
                      - Precision PM Tools
                    </BodyLarge>
                  </div>

                  <div className="border-t border-precision-200 pt-6 dark:border-precision-700">
                    <Title>Early Access Program</Title>
                    <Body className="mt-2">
                      Join our exclusive early access program and be among the
                      first to experience the future of project management
                      tools.
                    </Body>
                    <div className="mt-4 flex items-center gap-4">
                      <PrimaryAccent>Q4 2025 Launch</PrimaryAccent>
                      <Caption>Limited spots available</Caption>
                    </div>
                  </div>

                  <div className="border-t border-precision-200 pt-6 dark:border-precision-700">
                    <Label>Target Audience</Label>
                    <Body className="mt-2">
                      Project managers, team leads, and organizations seeking
                      <AccentText className="ml-1">
                        {' '}
                        precision tools
                      </AccentText>{' '}
                      that
                      <SuccessText className="ml-1">
                        {' '}
                        deliver results
                      </SuccessText>{' '}
                      without complexity.
                    </Body>
                  </div>
                </div>
              </ElevatedCard>
            </section>

            {/* Usage Guidelines */}
            <section>
              <Headline className="mb-8">Usage Guidelines</Headline>
              <Card>
                <div className="space-y-4">
                  <Title>Typography Best Practices</Title>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <Label className="text-success-600">Do:</Label>
                      <ul className="mt-2 space-y-1 text-sm text-precision-700 dark:text-precision-300">
                        <li>• Use Hero for main page headlines only</li>
                        <li>• Maintain consistent hierarchy</li>
                        <li>• Use accent colors sparingly</li>
                        <li>• Keep line lengths readable (45-75 characters)</li>
                      </ul>
                    </div>
                    <div>
                      <Label className="text-primary-600">Don't:</Label>
                      <ul className="mt-2 space-y-1 text-sm text-precision-700 dark:text-precision-300">
                        <li>• Mix too many accent colors</li>
                        <li>• Use Hero text in cards</li>
                        <li>• Overuse gradient text</li>
                        <li>• Skip heading levels</li>
                      </ul>
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

export const Route = createFileRoute('/typography-guide')({
  component: TypographyGuide,
});
