

export default function CustomFormartDateValue({DocDate}) {
    const date = new Date(DocDate);
    const formattedDate = date.toLocaleDateString();
  return formattedDate
}