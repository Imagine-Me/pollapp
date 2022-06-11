import { notification } from 'antd';
export default async function copyToClipboard() {
  const toCopy = location.href;
  await navigator.clipboard.writeText(toCopy);
  notification.success({
    message: 'Copied to clipboard',
  })
}
