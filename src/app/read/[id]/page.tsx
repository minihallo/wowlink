
type ReadProps = {
    params: {
      id: string
    }
}

export default async function Read(props: ReadProps) {
    const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + `topics/${props.params.id}`, {cache:'no-cache'});
    const topic = await resp.json();
    return (
        <>
        <h2>{topic.title}</h2>
        {topic.body}
        </>
    )
}