export async function DELETE(
    request: Request,
    { params }: { params: { uid: string } },
) {
    const uid = params.uid;

    const URI = process.env.DELETE_notice;

    try {
        const result = await fetch(`${URI}${uid}`, {
            method: "DELETE",
        }).then((r) => r.json());
        console.log(result);
        if (result) {
        } else {
            return new Response("failed read body", { status: 404 });
        }
        return new Response("User has registered", { status: 200 });
    } catch (error) {
        console.error(error);
    }
}
