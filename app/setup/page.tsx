import { setup } from '@/lib/setup';

export default async function SetupPage() {
  await setup();
  return <></>;
}
