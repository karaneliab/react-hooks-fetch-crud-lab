import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  // const[question,setQuestions] = useState('')

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {/* <QuestionItem question={question} setQuestions={setQuestions}/> */}
      {page === "Form" ? <QuestionForm /> : <QuestionList />}
   
    </main>
  );
}

export default App;
