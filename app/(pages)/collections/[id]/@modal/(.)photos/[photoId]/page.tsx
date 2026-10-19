import Modal from "@/components/Modal";
import PhotoViewer from "@/components/PhotoViewer";

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
