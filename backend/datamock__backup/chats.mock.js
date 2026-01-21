const mockChats = [
    {
        id: "1",
        inputText: "สวสดีครับผม วันนี้ผมกำลงหิวเลยและผมกำลงจะไปทำข้าวกิน",
        outputText: {
            corrected_text: "สวัสดีครับผม วันนี้ผมกำลังหิวเลย และผมกำลังจะไปทำข้าวกิน",
            changes: [
                {
                    from: "สวสดี",
                    to: "สวัสดี",
                    reason_th: "สะกดคำให้ถูกต้อง",
                    count: 1
                },
                {
                    from: "กำลง",
                    to: "กำลัง",
                    reason_th: "สะกดคำให้ถูกต้อง",
                    count: 2
                },
                {
                    from: "เลยและ",
                    to: "เลย และ",
                    reason_th: "ปรับเว้นวรรค/คำเชื่อมให้อ่านง่าย",
                    count: 1
                }
            ]
        },
        mode_model: "grammar_correction",
        correct_version_text: null,
        userId: "1",
        createdAt: "2024-12-25T10:00:00Z",
    },
    {
        id: "2",
        inputText: "ผมชอบกินข้าวมากๆเลยครับ แต่วันี้ผมไม่ได้กินเพราะไม่มีเวลา",
        outputText: {
            corrected_text: "ผมชอบกินข้าวมากๆ เลยครับ แต่วันนี้ผมไม่ได้กินเพราะไม่มีเวลา",
            changes: [
                {
                    from: "มากๆเลย",
                    to: "มากๆ เลย",
                    reason_th: "ปรับเว้นวรรคให้ถูกต้อง",
                    count: 1
                },
                {
                    from: "วันี้",
                    to: "วันนี้",
                    reason_th: "สะกดคำให้ถูกต้อง",
                    count: 1
                }
            ]
        },
        mode_model: "grammar_correction",
        correct_version_text: "ผมชอบกินข้าวมากเลยครับ แต่วันนี้ผมไม่ได้กินเพราะไม่มีเวลา",
        userId: "1",
        createdAt: "2024-12-25T10:05:00Z",
    },
    {
        id: "3",
        inputText: "เขาเป็นคนดีมากเลยค่ะ แต่เค้าไม่ค่อยมีเวลาให้เราเท่าไหร",
        outputText: {
            corrected_text: "เขาเป็นคนดีมากเลยค่ะ แต่เขาไม่ค่อยมีเวลาให้เราเท่าไหร่",
            changes: [
                {
                    from: "เค้า",
                    to: "เขา",
                    reason_th: "ใช้คำที่เป็นทางการมากขึ้น",
                    count: 1
                },
                {
                    from: "เท่าไหร",
                    to: "เท่าไหร่",
                    reason_th: "สะกดคำให้ถูกต้อง",
                    count: 1
                }
            ]
        },
        mode_model: "grammar_correction",
        correct_version_text: null,
        userId: "2",
        createdAt: "2024-12-25T10:10:00Z",
    },
    {
        id: "4",
        inputText: "ฉันอยากไปเที่ยวทะเลมากๆค่ะ แต่ไม่มีใครไปด้วยเลยอ่ะ",
        outputText: {
            corrected_text: "ฉันอยากไปเที่ยวทะเลมากๆ ค่ะ แต่ไม่มีใครไปด้วยเลย",
            changes: [
                {
                    from: "มากๆค่ะ",
                    to: "มากๆ ค่ะ",
                    reason_th: "ปรับเว้นวรรคก่อนคำลงท้าย",
                    count: 1
                },
                {
                    from: "เลยอ่ะ",
                    to: "เลย",
                    reason_th: "ตัดคำที่ไม่จำเป็นออก",
                    count: 1
                }
            ]
        },
        mode_model: "formal_correction",
        correct_version_text: null,
        userId: "2",
        createdAt: "2024-12-25T10:15:00Z",
    },
    {
        id: "5",
        inputText: "ระบบทำงานได้ดีมากคับ ขอบคุนครับ",
        outputText: {
            corrected_text: "ระบบทำงานได้ดีมากครับ ขอบคุณครับ",
            changes: [
                {
                    from: "คับ",
                    to: "ครับ",
                    reason_th: "สะกดคำให้ถูกต้อง",
                    count: 1
                },
                {
                    from: "ขอบคุน",
                    to: "ขอบคุณ",
                    reason_th: "สะกดคำให้ถูกต้อง",
                    count: 1
                }
            ]
        },
        mode_model: "grammar_correction",
        correct_version_text: null,
        userId: "3",
        createdAt: "2024-12-25T10:20:00Z",
    },
];

module.exports = mockChats;
