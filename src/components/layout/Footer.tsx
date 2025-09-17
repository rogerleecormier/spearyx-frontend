import { Link } from '@tanstack/react-router';

import { Body, Caption, Title } from '@/components/brand';

export function Footer() {
  return (
    <footer className="border-t border-precision-200 bg-precision-50 dark:border-precision-800 dark:bg-precision-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center space-x-3">
              <img
                src="/images/spearyx-logo.svg"
                alt="Spearyx"
                className="h-8 w-auto"
              />
            </div>
            <Body className="mb-4 text-precision-600 dark:text-precision-400">
              Precision project management tools that just work. AI-augmented
              solutions for modern teams without the complexity.
            </Body>
            <Caption className="text-precision-500 dark:text-precision-500">
              Early Access Q4 2025 • Full Release Q1 2026
            </Caption>
          </div>

          {/* Tools Section */}
          <div>
            <Title className="mb-4 text-precision-900 dark:text-precision-50">
              Tools
            </Title>
            <ul className="space-y-2">
              <li>
                <Body className="text-precision-600 dark:text-precision-400">
                  RACI Chart Generator
                </Body>
              </li>
              <li>
                <Body className="text-precision-600 dark:text-precision-400">
                  Project Charter Builder
                </Body>
              </li>
              <li>
                <Body className="text-precision-600 dark:text-precision-400">
                  Risk Assessment Tool
                </Body>
              </li>
              <li>
                <Caption className="text-precision-500 dark:text-precision-500">
                  And many more coming soon...
                </Caption>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <Title className="mb-4 text-precision-900 dark:text-precision-50">
              Company
            </Title>
            <ul className="space-y-2">
              <li>
                <Body className="text-precision-600 dark:text-precision-400">
                  About Us
                </Body>
              </li>
              <li>
                <Body className="text-precision-600 dark:text-precision-400">
                  Contact
                </Body>
              </li>
              <li>
                <Body className="text-precision-600 dark:text-precision-400">
                  Privacy Policy
                </Body>
              </li>
              <li>
                <Body className="text-precision-600 dark:text-precision-400">
                  Terms of Service
                </Body>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-precision-200 pt-8 dark:border-precision-800">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <Caption className="text-precision-500 dark:text-precision-500">
              © 2024 Spearyx. All rights reserved.
            </Caption>
            <div className="mt-4 flex items-center space-x-6 md:mt-0">
              <Link
                to="/"
                className="text-precision-500 hover:text-precision-700 dark:text-precision-500 dark:hover:text-precision-300"
              >
                <Caption>Home</Caption>
              </Link>
              <Caption className="text-precision-500 dark:text-precision-500">
                •
              </Caption>
              <Caption className="text-precision-500 dark:text-precision-500">
                Built with precision and care
              </Caption>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
