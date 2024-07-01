/* eslint-disable prettier/prettier */

export default function TimeZoneFunction(date, timeZone) {
    if (typeof date === 'string') {
        return new Date(
            new Date(date).toLocaleString('ja-JP', {
                timeZone,
            })
        );
    }

    return new Date(
        date.toLocaleString('ja-JP', {
            timeZone,
        })
    );
}

// const time_acc_zone = TimeZoneFunction(
//     '2023/10/29 11:13:07',
//     Intl.DateTimeFormat().resolvedOptions().timeZone
// );
