module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  workerIdleMemoryLimit: 512,
  transform: {
    '.*\\.ts$': [
      '@swc/jest', {
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: true
          },
          transform: {
            'decoratorMetadata': true,
            'legacyDecorator': false
          },
        },
      },
    ],
    '.*\\.tsx$': [
      '@swc/jest', {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: true
          },
          transform: {
            'decoratorMetadata': true,
            'legacyDecorator': false,
            react: {
              runtime: 'classic',
              pragma: 'jsx',
              throwIfNamespace: true,
              development: false,
              useBuiltins: false,
              importSource: '@/config/jsx'
            }
          },
        },
      },
    ]
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '#node-web-compat': './node-web-compat-node.js'
  },
  moduleDirectories: [
    'node_modules'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  clearMocks: true
}
