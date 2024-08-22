'use client'
  
import { useRouter } from "next/navigation";
  
export default function Create(){
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;
    const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + 'topics/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, body})
    });
    const topic = await resp.json();
    router.push(`/read/${topic.id}`);
    router.refresh();
  }
  
  return <form onSubmit={handleSubmit}>
    <h2>Create</h2>
    <p><input type="text" name="title" placeholder="title" /></p>
    <p><textarea name="body" placeholder="body"></textarea></p>
    <p><input type="submit" value="create" /></p>
  </form>
}