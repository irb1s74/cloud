import { ReactElement } from 'react';
import { EModal } from '../models/EModal';
import CreateDir from '../containers/CreateDir/CreateDir';

const getModal = (
  id: number,
  type: EModal,
  option: any
): ReactElement | null => {
  switch (type) {
    case EModal.createDir:
      return <CreateDir key={id} />;
    default:
      return null;
  }
};
export { getModal };
