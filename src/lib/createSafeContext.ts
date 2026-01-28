import { createContext, useContext, type Provider } from 'react';

export type CreateContextReturn<T> = [Provider<T>, () => T];

/** -------------------------------------------------------------
 *  React Context 사용 시 초기값 선언을 생략하고 런타임 에러 코드 등 boilerplate를 일관되게 포함시켜 응집도를 높임
 *
 *  #### References
 *  - [toss/overlay-kit](https://github.com/toss/overlay-kit/blob/main/packages/src/utils/create-safe-context.ts)
 *  - [radix ui/primitives](https://github.com/radix-ui/primitives/blob/main/packages/react/context/src/create-context.tsx)
 *  -------------------------------------------------------------- */
export function createSafeContext<T>(displayName?: string): CreateContextReturn<T> {
  const NullSymbol = Symbol('Null');

  const Context = createContext<T | typeof NullSymbol>(NullSymbol);
  Context.displayName = displayName ?? 'SafeContext';

  function useSafeContext() {
    const context = useContext(Context);

    if (context === NullSymbol) {
      const error = new Error(`[${Context.displayName}]: Provider not found.`);
      error.name = '[Error] Context';

      throw error;
    }

    return context;
  }

  return [Context.Provider as Provider<T>, useSafeContext];
}
