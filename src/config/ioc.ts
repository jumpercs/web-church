import { container } from 'tsyringe'

import { IocContainer, IocContainerFactory, ServiceIdentifier } from '@tsoa/runtime'

export const iocContainer: IocContainerFactory = function (
  request: Request
): IocContainer {
  const childContainer = container.createChildContainer()
  childContainer.registerInstance('httpRequest', request)

  return {
    get: <T extends object>(controller: ServiceIdentifier<T>): T => {
      const dependency = childContainer.resolve<T>(controller as never)
      return dependency
    }
  }
}
