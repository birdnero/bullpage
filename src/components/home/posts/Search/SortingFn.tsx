type TypePostPrewiew = {
    url: string,
    name: string,
    date: string,
    rating:number,
    ppl_rated_it: number,
}

type TypeSorting = "date_up" | "date_down" | "rating_up" | "rating_down"
//Далі починається сама сортувалка
export const sortPostFn = (posts: TypePostPrewiew[], sortingMethod: TypeSorting): TypePostPrewiew[] => {
    return [...posts].sort((a, b) => {
      switch (sortingMethod) {
        case 'date_up':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'date_down':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'rating_up':
          return a.rating - b.rating;
        case 'rating_down':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  };