import { createFileRoute } from '@tanstack/react-router';

import {
  Body,
  BodyLarge,
  Caption,
  Card,
  ElevatedCard,
  GlassCard,
  Headline,
  Hero,
  Label,
  PrimaryAccent,
  Title,
} from '@/components/brand';
import { Layout } from '@/components/layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

function StylesGuide() {
  return (
    <Layout>
      <div className="min-h-screen bg-precision-50 py-12 dark:bg-precision-900">
        <div className="container mx-auto max-w-6xl px-4">
          <Hero className="mb-12 text-center">Styles Guide</Hero>
          <BodyLarge className="mb-16 text-center text-precision-600 dark:text-precision-400">
            Additional brand elements, effects, and utility styles not covered
            in Typography or Cards guides
          </BodyLarge>

          <div className="space-y-16">
            {/* Dividers & Separators */}
            <section>
              <Headline className="mb-8">Dividers & Separators</Headline>
              <div className="space-y-6">
                <Card>
                  <Title className="mb-4">Basic Separators</Title>
                  <div className="space-y-6">
                    <div>
                      <Label>Default Separator</Label>
                      <div className="mt-2">
                        <Body>Content above</Body>
                        <Separator className="my-4" />
                        <Body>Content below</Body>
                      </div>
                    </div>

                    <div>
                      <Label>Thick Separator</Label>
                      <div className="mt-2">
                        <Body>Content above</Body>
                        <Separator className="my-4 h-0.5" />
                        <Body>Content below</Body>
                      </div>
                    </div>

                    <div>
                      <Label>Colored Separators</Label>
                      <div className="mt-2 space-y-3">
                        <div>
                          <Caption>Primary Red</Caption>
                          <hr className="border-primary-500" />
                        </div>
                        <div>
                          <Caption>Accent Blue</Caption>
                          <hr className="border-accent-500" />
                        </div>
                        <div>
                          <Caption>Success Green</Caption>
                          <hr className="border-success-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <Title className="mb-4">Decorative Dividers</Title>
                  <div className="space-y-6">
                    <div>
                      <Label>Gradient Divider</Label>
                      <div className="mt-2">
                        <Body>Content above</Body>
                        <div className="my-4 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent"></div>
                        <Body>Content below</Body>
                      </div>
                    </div>

                    <div>
                      <Label>Dashed Divider</Label>
                      <div className="mt-2">
                        <Body>Content above</Body>
                        <hr className="my-4 border-dashed border-precision-300 dark:border-precision-600" />
                        <Body>Content below</Body>
                      </div>
                    </div>

                    <div>
                      <Label>Dotted Divider</Label>
                      <div className="mt-2">
                        <Body>Content above</Body>
                        <hr className="my-4 border-2 border-dotted border-precision-300 dark:border-precision-600" />
                        <Body>Content below</Body>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Gradients */}
            <section>
              <Headline className="mb-8">Gradients</Headline>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <Title className="mb-4">Background Gradients</Title>
                  <div className="space-y-4">
                    <div>
                      <Label>Primary Brand Gradient</Label>
                      <div className="mt-2 h-16 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 p-4 text-white">
                        <Body className="text-white">
                          Primary gradient background
                        </Body>
                      </div>
                    </div>

                    <div>
                      <Label>Accent Gradient</Label>
                      <div className="mt-2 h-16 rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 p-4 text-white">
                        <Body className="text-white">
                          Accent gradient background
                        </Body>
                      </div>
                    </div>

                    <div>
                      <Label>Subtle Precision Gradient</Label>
                      <div className="mt-2 h-16 rounded-lg bg-gradient-to-br from-precision-50 via-white to-precision-100 p-4 dark:from-precision-800 dark:via-precision-900 dark:to-precision-800">
                        <Body>Subtle gradient for cards and sections</Body>
                      </div>
                    </div>

                    <div>
                      <Label>Success Gradient</Label>
                      <div className="mt-2 h-16 rounded-lg bg-gradient-to-r from-success-500 to-success-600 p-4 text-white">
                        <Body className="text-white">
                          Success state gradient
                        </Body>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <Title className="mb-4">Text Gradients</Title>
                  <div className="space-y-4">
                    <div>
                      <Label>Primary Text Gradient</Label>
                      <div className="mt-2">
                        <div className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-2xl font-bold text-transparent">
                          Spearyx Precision Tools
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Accent Text Gradient</Label>
                      <div className="mt-2">
                        <div className="bg-gradient-to-r from-accent-500 to-accent-600 bg-clip-text text-2xl font-bold text-transparent">
                          Professional Excellence
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Multi-color Gradient</Label>
                      <div className="mt-2">
                        <div className="bg-gradient-to-r from-primary-500 via-accent-500 to-success-500 bg-clip-text text-2xl font-bold text-transparent">
                          Dynamic Brand Colors
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Rainbow Gradient</Label>
                      <div className="mt-2">
                        <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
                          Creative Expression
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Badges & Labels */}
            <section>
              <Headline className="mb-8">Badges & Labels</Headline>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <Title className="mb-4">Status Badges</Title>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default" className="bg-primary-500">
                      Primary
                    </Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Error</Badge>
                    <Badge className="bg-success-500">Success</Badge>
                    <Badge className="bg-warning-500">Warning</Badge>
                  </div>
                  <Caption className="mt-4">
                    Various badge styles for different states
                  </Caption>
                </Card>

                <Card>
                  <Title className="mb-4">Custom Badges</Title>
                  <div className="space-y-3">
                    <div>
                      <Badge className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                        Featured
                      </Badge>
                    </div>
                    <div>
                      <Badge className="border-accent-500 bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-300">
                        Professional
                      </Badge>
                    </div>
                    <div>
                      <Badge className="animate-pulse bg-success-500">
                        Live
                      </Badge>
                    </div>
                    <div>
                      <Badge className="bg-precision-800 text-precision-100 dark:bg-precision-200 dark:text-precision-900">
                        Premium
                      </Badge>
                    </div>
                  </div>
                </Card>

                <Card>
                  <Title className="mb-4">Notification Badges</Title>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Body>Messages</Body>
                      <Badge className="h-5 w-5 rounded-full bg-primary-500 p-0 text-xs">
                        3
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Body>Alerts</Body>
                      <Badge className="h-5 w-5 rounded-full bg-warning-500 p-0 text-xs">
                        !
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Body>Updates</Body>
                      <Badge className="h-2 w-2 rounded-full bg-success-500 p-0"></Badge>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Button Variants */}
            <section>
              <Headline className="mb-8">Button Variants</Headline>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <Title className="mb-4">Primary Buttons</Title>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Button>Default</Button>
                      <Button size="sm">Small</Button>
                      <Button size="lg">Large</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button className="bg-primary-500 hover:bg-primary-600">
                        Brand Primary
                      </Button>
                      <Button className="bg-accent-500 hover:bg-accent-600">
                        Accent
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                        Gradient
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card>
                  <Title className="mb-4">Secondary Buttons</Title>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        className="border-primary-500 text-primary-500 hover:bg-primary-50"
                      >
                        Primary Outline
                      </Button>
                      <Button
                        variant="outline"
                        className="border-accent-500 text-accent-500 hover:bg-accent-50"
                      >
                        Accent Outline
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="destructive">Destructive</Button>
                      <Button className="bg-success-500 hover:bg-success-600">
                        Success
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Effects & Animations */}
            <section>
              <Headline className="mb-8">Effects & Animations</Headline>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <Title className="mb-4">Hover Effects</Title>
                  <div className="space-y-4">
                    <div className="cursor-pointer rounded-lg bg-precision-100 p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg dark:bg-precision-800">
                      <Body>Hover to Scale</Body>
                    </div>
                    <div className="cursor-pointer rounded-lg bg-precision-100 p-4 transition-all duration-300 hover:bg-primary-50 hover:shadow-md dark:bg-precision-800 dark:hover:bg-primary-950">
                      <Body>Hover Color Change</Body>
                    </div>
                    <div className="cursor-pointer rounded-lg bg-precision-100 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/20 dark:bg-precision-800">
                      <Body>Hover Glow Effect</Body>
                    </div>
                  </div>
                </Card>

                <Card>
                  <Title className="mb-4">Glass Effects</Title>
                  <div className="space-y-4">
                    <GlassCard>
                      <Body>Standard Glass Card</Body>
                      <Caption className="mt-2">
                        Backdrop blur with transparency
                      </Caption>
                    </GlassCard>
                    <div className="rounded-lg bg-white/10 p-4 backdrop-blur-md dark:bg-black/10">
                      <Body>Custom Glass Effect</Body>
                      <Caption className="mt-2">
                        Manual backdrop blur implementation
                      </Caption>
                    </div>
                  </div>
                </Card>

                <Card>
                  <Title className="mb-4">Shadow Variations</Title>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-precision-800">
                      <Body>Small Shadow</Body>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-md dark:bg-precision-800">
                      <Body>Medium Shadow</Body>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-lg dark:bg-precision-800">
                      <Body>Large Shadow</Body>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-2xl dark:bg-precision-800">
                      <Body>Extra Large Shadow</Body>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Progress & Loading */}
            <section>
              <Headline className="mb-8">Progress & Loading States</Headline>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <Title className="mb-4">Progress Bars</Title>
                  <div className="space-y-4">
                    <div>
                      <Label>Default Progress</Label>
                      <Progress value={75} className="mt-2" />
                    </div>
                    <div>
                      <Label>Success Progress</Label>
                      <Progress
                        value={100}
                        className="mt-2 [&>div]:bg-success-500"
                      />
                    </div>
                    <div>
                      <Label>Warning Progress</Label>
                      <Progress
                        value={45}
                        className="mt-2 [&>div]:bg-warning-500"
                      />
                    </div>
                    <div>
                      <Label>Primary Progress</Label>
                      <Progress
                        value={60}
                        className="mt-2 [&>div]:bg-primary-500"
                      />
                    </div>
                  </div>
                </Card>

                <Card>
                  <Title className="mb-4">Loading Animations</Title>
                  <div className="space-y-4">
                    <div>
                      <Label>Pulse Animation</Label>
                      <div className="mt-2 h-8 w-32 animate-pulse rounded-lg bg-precision-200 dark:bg-precision-700"></div>
                    </div>
                    <div>
                      <Label>Spin Animation</Label>
                      <div className="mt-2">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-precision-200 border-t-primary-500"></div>
                      </div>
                    </div>
                    <div>
                      <Label>Bounce Animation</Label>
                      <div className="mt-2 flex space-x-1">
                        <div className="h-3 w-3 animate-bounce rounded-full bg-primary-500 [animation-delay:-0.3s]"></div>
                        <div className="h-3 w-3 animate-bounce rounded-full bg-primary-500 [animation-delay:-0.15s]"></div>
                        <div className="h-3 w-3 animate-bounce rounded-full bg-primary-500"></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Color Palette */}
            <section>
              <Headline className="mb-8">Color Palette</Headline>
              <div className="space-y-6">
                <Card>
                  <Title className="mb-4">Brand Colors</Title>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                    <div>
                      <Label>Primary Red</Label>
                      <div className="mt-2 space-y-1">
                        <div className="flex h-8 items-center justify-center rounded bg-primary-400 text-sm text-white">
                          400
                        </div>
                        <div className="flex h-8 items-center justify-center rounded bg-primary-500 text-sm text-white">
                          500
                        </div>
                        <div className="flex h-8 items-center justify-center rounded bg-primary-600 text-sm text-white">
                          600
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label>Accent Blue</Label>
                      <div className="mt-2 space-y-1">
                        <div className="flex h-8 items-center justify-center rounded bg-accent-400 text-sm text-white">
                          400
                        </div>
                        <div className="flex h-8 items-center justify-center rounded bg-accent-500 text-sm text-white">
                          500
                        </div>
                        <div className="flex h-8 items-center justify-center rounded bg-accent-600 text-sm text-white">
                          600
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label>Success Green</Label>
                      <div className="mt-2 space-y-1">
                        <div className="flex h-8 items-center justify-center rounded bg-success-400 text-sm text-white">
                          400
                        </div>
                        <div className="flex h-8 items-center justify-center rounded bg-success-500 text-sm text-white">
                          500
                        </div>
                        <div className="flex h-8 items-center justify-center rounded bg-success-600 text-sm text-white">
                          600
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label>Warning Yellow</Label>
                      <div className="mt-2 space-y-1">
                        <div className="flex h-8 items-center justify-center rounded bg-warning-400 text-sm text-white">
                          400
                        </div>
                        <div className="flex h-8 items-center justify-center rounded bg-warning-500 text-sm text-white">
                          500
                        </div>
                        <div className="flex h-8 items-center justify-center rounded bg-warning-600 text-sm text-white">
                          600
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <Title className="mb-4">Precision Grays</Title>
                  <div className="grid grid-cols-5 gap-2 md:grid-cols-10">
                    <div className="text-center">
                      <div className="flex h-12 w-full items-center justify-center rounded bg-precision-50 text-xs font-medium text-black">
                        50
                      </div>
                      <Caption className="mt-1">50</Caption>
                    </div>
                    <div className="text-center">
                      <div className="flex h-12 w-full items-center justify-center rounded bg-precision-100 text-xs font-medium text-black">
                        100
                      </div>
                      <Caption className="mt-1">100</Caption>
                    </div>
                    <div className="text-center">
                      <div className="flex h-12 w-full items-center justify-center rounded bg-precision-200 text-xs font-medium text-black">
                        200
                      </div>
                      <Caption className="mt-1">200</Caption>
                    </div>
                    <div className="text-center">
                      <div className="flex h-12 w-full items-center justify-center rounded bg-precision-300 text-xs font-medium text-black">
                        300
                      </div>
                      <Caption className="mt-1">300</Caption>
                    </div>
                    <div className="text-center">
                      <div className="flex h-12 w-full items-center justify-center rounded bg-precision-400 text-xs font-medium text-black">
                        400
                      </div>
                      <Caption className="mt-1">400</Caption>
                    </div>
                    <div className="text-center">
                      <div className="flex h-12 w-full items-center justify-center rounded bg-precision-500 text-xs font-medium text-white">
                        500
                      </div>
                      <Caption className="mt-1">500</Caption>
                    </div>
                    <div className="text-center">
                      <div className="flex h-12 w-full items-center justify-center rounded bg-precision-600 text-xs font-medium text-white">
                        600
                      </div>
                      <Caption className="mt-1">600</Caption>
                    </div>
                    <div className="text-center">
                      <div className="flex h-12 w-full items-center justify-center rounded bg-precision-700 text-xs font-medium text-white">
                        700
                      </div>
                      <Caption className="mt-1">700</Caption>
                    </div>
                    <div className="text-center">
                      <div className="flex h-12 w-full items-center justify-center rounded bg-precision-800 text-xs font-medium text-white">
                        800
                      </div>
                      <Caption className="mt-1">800</Caption>
                    </div>
                    <div className="text-center">
                      <div className="flex h-12 w-full items-center justify-center rounded bg-precision-900 text-xs font-medium text-white">
                        900
                      </div>
                      <Caption className="mt-1">900</Caption>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Usage Guidelines */}
            <section>
              <Headline className="mb-8">Usage Guidelines</Headline>
              <ElevatedCard>
                <div className="space-y-6">
                  <Title>Style System Best Practices</Title>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <Label className="text-success-600">
                        Recommended Usage:
                      </Label>
                      <ul className="mt-2 space-y-1 text-sm text-precision-700 dark:text-precision-300">
                        <li>• Use gradients sparingly for emphasis</li>
                        <li>• Maintain consistent spacing (8px grid)</li>
                        <li>• Apply hover effects to interactive elements</li>
                        <li>• Use appropriate status colors for context</li>
                        <li>• Combine effects subtly for professional look</li>
                        <li>• Test accessibility with color contrast</li>
                      </ul>
                    </div>
                    <div>
                      <Label className="text-primary-600">Avoid:</Label>
                      <ul className="mt-2 space-y-1 text-sm text-precision-700 dark:text-precision-300">
                        <li>• Overusing animated elements</li>
                        <li>• Too many gradient backgrounds</li>
                        <li>• Inconsistent shadow depths</li>
                        <li>• Poor color combinations</li>
                        <li>• Excessive hover effects</li>
                        <li>• Breaking the spacing system</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-precision-200 pt-6 dark:border-precision-700">
                    <Title className="mb-4">Integration Examples</Title>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-gradient-to-r from-primary-50 to-accent-50 p-4 dark:from-primary-950 dark:to-accent-950">
                        <div className="flex items-center justify-between">
                          <div>
                            <Title>Project Status</Title>
                            <Body className="mt-1">
                              Combining multiple style elements effectively
                            </Body>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-success-500">Active</Badge>
                            <Button
                              size="sm"
                              className="bg-primary-500 hover:bg-primary-600"
                            >
                              View
                            </Button>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex items-center justify-between">
                          <Label>Progress</Label>
                          <PrimaryAccent>75% Complete</PrimaryAccent>
                        </div>
                        <Progress
                          value={75}
                          className="mt-2 [&>div]:bg-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ElevatedCard>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const Route = createFileRoute('/styles-guide')({
  component: StylesGuide,
});
