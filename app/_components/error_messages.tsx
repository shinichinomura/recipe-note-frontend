
export default function ErrorMessages(props: { messages: string[] }) {
  return (
    props.messages.length > 0 && (
      <div className="error-messages mb-6 rounded-md border border-solid border-red-400 p-2 text-red-400">
        <ul>
          {
            props.messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))
          }
        </ul>
      </div>
    )
  )
}