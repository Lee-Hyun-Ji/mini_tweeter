export function cls(...classnames: string[]) {
    return classnames.join(" ");
  }

export function formatDate(inputDate:string) {
  const date = new Date(inputDate);

  // 년, 월, 일 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // 시간 추출
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const amOrPm = hours >= 12 ? 'PM' : 'AM';

  // 12시간제로 변환
  hours = hours % 12 || 12;
  
    // 시간과 분이 10보다 작을 때 앞에 0을 붙이기
    const formattedHours = String(hours).padStart(2, '0');

    // 최종 포맷 문자열 생성
    const formattedDate = `${year}/${month}/${day} ${formattedHours}:${minutes} ${amOrPm}`;
    return formattedDate;
}

export function getRandomHexColor() {
  const hexCharacters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += hexCharacters[Math.floor(Math.random() * 16)];
  }

  return color;
}