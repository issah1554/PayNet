// hooks/useUser.ts
import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../services/usersService";

export function useUser(userId: string) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserProfile(userId).then((data) => {
            setUser(data);
            setLoading(false);
        });
    }, [userId]);

    const updateProfile = async (data: { username: string; phone: string }) => {
        const updated = await updateUserProfile(userId, data);
        setUser(updated);
    };

    return { user, loading, updateProfile };
}
