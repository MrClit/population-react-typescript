import PageContent from "../components/PageContent.tsx";

export default function ErrorPage() {

  const title = "An error has occurred!";
  const message = "Something went wrong!";

  return (
    <>
      <PageContent title={title}>
        {message}
      </PageContent>
    </>
  )
}