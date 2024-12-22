import { Session, User } from "@supabase/supabase-js";
import { Transform } from "src/common";

export class VerificationTransform extends Transform <VerificationItem> {
    transform(item: VerificationItem) {
        const {user, session} = item;
        return {
            user: {
                id: user.id,
                email: user.email,
                emailConfirmed: user.email_confirmed_at,
                role: user.role,
            },
            session:{
                accessToken: session.access_token,
                refreshToken: session.refresh_token,
                expiresAt: session.expires_at,
            }
        }
    }
}

interface VerificationItem {
    user: User,
    session: Session,
}

