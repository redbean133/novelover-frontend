import { AuthorRepositoryImpl } from "@/data/repositories-implementation/author.repositoryImpl";
import { GenreRepositoryImpl } from "@/data/repositories-implementation/genre.repositoryImpl";
import { NovelRepositoryImpl } from "@/data/repositories-implementation/novel.repositoryImpl";
import { AuthorUseCase } from "@/domain/usecases/author.usecase";
import { GenreUseCase } from "@/domain/usecases/genre.usecase";
import { NovelUseCase } from "@/domain/usecases/novel.usecase";
import {
  updateNovelDetailData,
  updateNovelFormData,
} from "@/presentation/redux/slices/myNovels.slice";
import type { RootState } from "@/presentation/redux/store";
import { cleanWhitespace, startCase } from "@/shared/utils/helpers";
import { validateRequiredTextInput } from "@/shared/utils/validate";
import { AxiosError } from "axios";
import { isEmpty, isEqual } from "lodash";
import { useEffect, useMemo, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "use-debounce";

export const NovelFormViewModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorUseCase = AuthorUseCase(new AuthorRepositoryImpl());
  const genreUseCase = GenreUseCase(new GenreRepositoryImpl());
  const novelUseCase = NovelUseCase(new NovelRepositoryImpl());
  const { id: novelId } = useParams();
  const isFirstRender = useRef(true);

  const {
    authorName,
    isSelectAuthor,
    genres,
    title,
    isOriginal,
    description,
    selectedGenreIds,
  } = useSelector((state: RootState) => state.myNovels.novelFormData);

  const originNovelDetailData = useSelector(
    (state: RootState) => state.myNovels.novelDetail.novel
  );

  const originSelectedGenreIds = useMemo(() => {
    return originNovelDetailData.genres.map((genre) => genre.id.toString());
  }, [originNovelDetailData.genres]);

  const originAuthorName = useMemo(() => {
    return originNovelDetailData?.author?.name
      ? originNovelDetailData?.author?.name
      : "";
  }, [originNovelDetailData.author]);

  const isChangeNovelDetail =
    title !== originNovelDetailData.title ||
    authorName !== originAuthorName ||
    isOriginal !== originNovelDetailData.isOriginal ||
    description !== originNovelDetailData.description ||
    !isEqual(selectedGenreIds, originSelectedGenreIds);

  const getAllGenres = async () => {
    try {
      const genres = await genreUseCase.getAll();
      dispatch(updateNovelFormData({ genres }));
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Không thể lấy được danh sách thể loại truyện"
      );
    }
  };

  useEffect(() => {
    getAllGenres();
  }, []);

  const getSuggestions = async (authorName: string) => {
    if (authorName) {
      const authors = await authorUseCase.getSuggestions(authorName);
      if (authors)
        dispatch(
          updateNovelFormData({
            authorSuggestions: authors,
          })
        );
      else dispatch(updateNovelFormData({ authorSuggestions: [] }));
    } else {
      dispatch(updateNovelFormData({ authorSuggestions: [] }));
    }
  };

  const [debouncedAuthorName] = useDebounce(authorName, 500);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!isSelectAuthor) getSuggestions(cleanWhitespace(debouncedAuthorName));
    else
      dispatch(
        updateNovelFormData({ isSelectAuthor: false, authorSuggestions: [] })
      );
  }, [debouncedAuthorName]);

  const onChangeTitle = (value: string) => {
    const validation = validateRequiredTextInput(value, "Tên truyện");
    dispatch(
      updateNovelFormData({
        title: value,
        isValidTitle: validation.isValid,
        titleValidation: validation.message,
      })
    );
  };

  const onChangeAuthorName = (value: string) => {
    const validation = validateRequiredTextInput(value, "Tác giả");
    dispatch(
      updateNovelFormData({
        authorName: value,
        isValidAuthorName: validation.isValid,
        authorNameValidation: validation.message,
      })
    );
  };

  const onChangeDescription = (value: string) => {
    dispatch(
      updateNovelFormData({
        description: value,
      })
    );
  };

  const onCheckedIsOriginal = (checked: boolean) => {
    dispatch(
      updateNovelFormData({
        isOriginal: checked,
        authorName: "",
        isValidAuthorName: checked,
        authorNameValidation: checked ? "" : "Tác giả không được để trống",
      })
    );
  };

  const handleSelectAuthor = (name: string) => {
    dispatch(
      updateNovelFormData({
        authorName: name,
        isSelectAuthor: true,
        authorSuggestions: [],
      })
    );
  };

  const handleClickOutsideAuthorSuggestion = () => {
    dispatch(
      updateNovelFormData({
        authorSuggestions: [],
      })
    );
  };

  const genresData = useMemo(() => {
    return genres.map((genre) => {
      return {
        value: genre.id.toString(),
        label: genre.name,
      };
    });
  }, [genres]);

  const onChangeSelectedGenres = (selectedGenreIds: string[]) => {
    const haveSelectedGenres = !isEmpty(selectedGenreIds);
    dispatch(
      updateNovelFormData({
        selectedGenreIds,
        isValidGenre: haveSelectedGenres,
        genreValidation: haveSelectedGenres
          ? ""
          : "Phải chọn ít nhất 1 thể loại truyện",
      })
    );
  };

  const onSubmitNewNovel = async () => {
    try {
      dispatch(updateNovelFormData({ isLoadingSubmitForm: true }));
      const newNovel = await novelUseCase.createNovel({
        title: cleanWhitespace(title),
        authorName: startCase(authorName),
        isOriginal,
        genreIds: selectedGenreIds.map((id) => +id),
        description,
      });
      if (newNovel) {
        toast.success("Thêm truyện mới thành công");
        dispatch(updateNovelDetailData({ novel: newNovel }));
        navigate(`/my-novels/${newNovel.id}`);
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      dispatch(updateNovelFormData({ isLoadingSubmitForm: false }));
    }
  };

  const onUpdateNovel = async () => {
    if (!novelId) return;

    try {
      dispatch(updateNovelFormData({ isLoadingSubmitForm: true }));
      const updatedNovel = await novelUseCase.updateMyNovel(+novelId, {
        title: cleanWhitespace(title),
        authorName: startCase(authorName),
        isOriginal,
        genreIds: selectedGenreIds.map((id) => +id),
        description,
      });
      if (updatedNovel) {
        toast.success("Lưu thay đổi thành công");
        dispatch(
          updateNovelDetailData({ novel: updatedNovel, isEditMode: false })
        );
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      dispatch(updateNovelFormData({ isLoadingSubmitForm: false }));
    }
  };

  const onChangeEditMode = (isEditMode: boolean) => {
    dispatch(updateNovelDetailData({ isEditMode }));
  };

  return {
    genresData,
    novelId,
    isChangeNovelDetail,
    onChangeTitle,
    onChangeAuthorName,
    onChangeDescription,
    onCheckedIsOriginal,
    onChangeEditMode,
    onChangeSelectedGenres,
    onSubmitNewNovel,
    onUpdateNovel,
    handleSelectAuthor,
    handleClickOutsideAuthorSuggestion,
  };
};
