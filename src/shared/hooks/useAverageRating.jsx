export default function useAverageRating(reviews) {
    if(!reviews || reviews.length === 0)
        return 0;

    const total = reviews.reduce((sum, r) => sum + r.rating, 0);

    return total / reviews.length;
}
