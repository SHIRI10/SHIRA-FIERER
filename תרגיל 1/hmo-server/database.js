import mySql from "mysql2"
const pool = mySql.createPool({
    host: "127.0.0.1",
    password: "QAZwsx123456",
    user: 'root',
    database: 'hmo'
}).promise();

//Members

export async function getMembers() {
    const [a] = await pool.query("select * from members")
    return a;
}

export async function getMember(id) {
    const [[row]] = await pool.query(`SELECT * FROM members WHERE member_id = ?`, [id]);
    return row;
}


export async function postMember(member_id, first_name, last_name, date_of_birth, city, street, building_num, phone, mobile_phone) {
    const [{ insertId }] = await pool.query(`INSERT INTO members (member_id, first_name, last_name, date_of_birth, city, street, building_num, phone, mobile_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [member_id, first_name, last_name, date_of_birth, city, street, building_num, phone, mobile_phone]);//לבדוק מה עושים עם הסימן שאלה במקום של התז היא לא יכולה להיות נאל
    return await getMember(insertId);
}

export async function putMember(id, first_name, last_name, date_of_birth, city, street, building_num, phone, mobile_phone) {
    const [[result]] = await pool.query(`UPDATE members SET first_name=?, last_name=?, date_of_birth=?, city=?, street=?, building_num=?, phone=?, mobile_phone=? WHERE member_id=?`, [first_name, last_name, date_of_birth, city, street, building_num, phone, mobile_phone, id]);
    if (result.affectedRows === 0) {
        throw new Error(`Member with ID ${id} not found`);
    }
    return await getMember(id);
}

export async function deleteMember(id) {
    const [result] = await pool.query(`DELETE FROM members WHERE member_id=?`, [id]);
    if (result.affectedRows === 0) {
        throw new Error(`Member with ID ${id} not found`);
    }
    return { id };
}

// פונקציה לשליפת כל הרשומות מהטבלה
export async function getAllcovid_dataData() {
    const [rows] = await pool.query("SELECT * FROM covid_data");
    return rows;
}

// פונקציה לשליפת רשומה מסוימת לפי ה-ID
export async function getcovid_dataDataById(member_id) {
    const [[row]] = await pool.query("SELECT * FROM covid_data WHERE member_id = ?", [member_id]);
    return row;
}


// //vaccinations
// export async function getVaccinations() {
//     const [a] = await pool.query("select * from vaccinations")
//     return a;
// }



// const data=await postMember("123","shiri","fierer");
// const data = await getMembers();
//  const data=await postMember("999","יעכג","fכגדשierer","12/03/23","צחנ","בכעב","12");
// const data=await deleteMember("654");

// console.log(data)