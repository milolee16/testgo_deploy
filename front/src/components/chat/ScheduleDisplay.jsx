import React from 'react';

function ScheduleDisplay({ data }) {
    if (!data || typeof data !== 'object') {
        return <div>일정 데이터가 없습니다.</div>;
    }

    const {
        is_schedule,
        title,
        start_time,
        end_time,
        all_day,
        location,
        description,
        recurrence_rule
    } = data;

    // helper
    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        return date.toLocaleString(); // 로컬 시간 포맷
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: 20, borderRadius: 8, maxWidth: 600 }}>
            <h2>📅 추출된 일정 정보</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', rowGap: '10px' }}>
                <div><strong>일정 여부</strong></div>
                <div>{is_schedule ? '✅ 있음' : '❌ 없음'}</div>

                <div><strong>제목</strong></div>
                <div>{title || '-'}</div>

                <div><strong>시작 시간</strong></div>
                <div>{formatDate(start_time)}</div>

                <div><strong>종료 시간</strong></div>
                <div>{formatDate(end_time)}</div>

                <div><strong>하루 종일</strong></div>
                <div>{all_day === 1 ? '✅ 예' : '❌ 아니요'}</div>

                <div><strong>장소</strong></div>
                <div>{location || '-'}</div>

                <div><strong>설명</strong></div>
                <div>{description || '-'}</div>

                <div><strong>반복 여부</strong></div>
                <div>{recurrence_rule ? '🔁 있음' : '❌ 없음'}</div>
            </div>
        </div>
    );
}

export default ScheduleDisplay;