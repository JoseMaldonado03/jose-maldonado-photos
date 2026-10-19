import { getPhotoParams } from "@/app/unsplash";
import Modal from "@/components/Modal";
import PhotoViewer from "@/components/PhotoViewer";

export const revalidate = 86400;

export async function generateStaticParams() {
  return getPhotoParams();
}

export default async function PhotoModalPage({
  params,
}: {
  params: Promise<{ id: string; photoId: string }>;
}) {
  const { id, photoId } = await params;

  return (
    <Modal>
      <PhotoViewer collectionId={id} photoId={photoId} />
    </Modal>
  );
}
