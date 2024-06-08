const getWeek = (date: Date) => {
    const janFirst = new Date(date.getFullYear(), 0, 1);
    return Math.ceil(
        ((date.getTime() - janFirst.getTime()) / 86400000 + janFirst.getDay() + 1) / 7
    );
};

const isSameWeek = (dateA: Date, dateB: Date) => {
    return getWeek(dateA) === getWeek(dateB);
};

export const formatDate = (dateString?: string) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const currentDate = new Date();

    if (date.toDateString() === currentDate.toDateString()) {
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    if (isSameWeek(date, currentDate)) {
        return date.toLocaleDateString('ru-RU', { weekday: 'short' });
    }

    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};
