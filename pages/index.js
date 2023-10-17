import RootLayout from "@/components/RootLayout";

export default function Home() {
  return (
    <></>
  );
}

Home.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
