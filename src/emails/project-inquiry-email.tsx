type ProjectInquiryEmailProps = {
  name: string;
  email: string;
  projectType: string;
  company: string;
  message: string;
};

export function ProjectInquiryEmail({
  name,
  email,
  projectType,
  company,
  message,
}: ProjectInquiryEmailProps) {
  return (
    <main>
      <h1>New portfolio inquiry</h1>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Project type: {projectType}</p>
      {company ? <p>Company: {company}</p> : null}
      <p>Message: {message}</p>
    </main>
  );
}
