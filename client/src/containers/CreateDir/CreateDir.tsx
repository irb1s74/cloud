import React, { FC, memo, useCallback } from 'react';
import { modalSlice } from '../../store/reducers/modalReducer';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import fileAPI from '../../api/FileService';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface CreateDirProps {
  handleCloseModal: () => void;
  token: string;
}

const CreateDir: FC<CreateDirProps> = memo(({ handleCloseModal, token }) => {
  const [createDir, { data: files, error, isLoading }] =
    fileAPI.useCreateDirMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().required('Название обязательно '),
    }),
    onSubmit: async (values) => {
      await createDir({ parentId: 0, name: values.name, token });
      if (error && 'status' in error && error.status === 400) {
        formik.errors.name = 'Директория с таким именем уже существует';
      } else {
        handleCloseModal();
      }
    },
  });
  return (
    <Dialog open={true} onClose={handleCloseModal} maxWidth='xs' fullWidth>
      <DialogTitle>Создать директорию</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            id='name'
            sx={{ color: '#00C2FFFF' }}
            label='Название'
            variant='standard'
            type='text'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Отмена</Button>
          <Button disabled={isLoading} type='submit'>
            Создать
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});

const ContainerCreateDir = () => {
  const dispatch = useAppDispatch();
  const handleCloseModal = useCallback(
    () => dispatch(modalSlice.actions.closeModal()),
    []
  );
  const token = useAppSelector((state) => state.authReducer.user.token);
  return <CreateDir token={token} handleCloseModal={handleCloseModal} />;
};
export default ContainerCreateDir;