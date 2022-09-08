import React, { FC, memo } from 'react';
import File from '../../../../UI/File/File';
import { IFile } from '../../../../../models/IFile';

interface DiskGridProps {
  files: IFile[];
  handleSelectFile: (index: number) => () => void;
  selectFile: number | null;
  handleOpenActions: (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => void;
  dragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  dragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  dragEnterFunc: (event: React.DragEvent<HTMLDivElement>) => void;
}

const DiskGrid: FC<DiskGridProps> = ({
  files,
  handleSelectFile,
  handleOpenActions,
  selectFile,
  dragOver,
  dragEnterFunc,
  dragLeave,
}) => {
  return (
    <div
      onDragEnter={dragEnterFunc}
      onDragOver={dragOver}
      onDragLeave={dragLeave}
      className='layout__grid'
    >
      {files.map((file, index) => (
        <div
          key={file.id}
          onClick={handleSelectFile(index)}
          onContextMenu={(event) => handleOpenActions(event, index)}
          className='layout__grid-item'
        >
          <File active={selectFile === index} file={file} />
        </div>
      ))}
    </div>
  );
};

export default memo(DiskGrid);
