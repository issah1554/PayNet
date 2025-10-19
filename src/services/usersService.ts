// services/userService.ts
export async function getUserProfile(userId: string) {
    const res = await fetch(`/api/users/${userId}`);
    return res.json();
}

export async function updateUserProfile(userId: string, data: { username: string, phone: string }) {
    const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}
