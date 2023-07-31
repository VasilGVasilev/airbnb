Especially important since there is no universal standrd for DB types and the types of our programming language. We may have entirely separate teams FE, BE, DB, developing in technologies of different ecosystems, thus, the necessity to translate types via sanitization.

```sh
import { User } from "@prisma/client";

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}
```