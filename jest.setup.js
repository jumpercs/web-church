import 'reflect-metadata'
import { beforeAll, beforeEach, jest } from 'jest'

import { setupTestI18n } from '@/utils/test_utils'

jest.setTimeout(30000)

beforeAll(setupTestI18n)

beforeEach(setupTestI18n)

