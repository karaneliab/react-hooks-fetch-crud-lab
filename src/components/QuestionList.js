import React,{useState,useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

const[questions,setQuestion]= useState([]) 

  useEffect(()=> {
    fetch(" http://localhost:4000/questions")
    .then(res => res.json())
    .then((data) => {
      setQuestion( data);
    });
  },[])



  async function handleDelete(id) {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'DELETE',
      });

  const updatedData = questions.filter((question) => id !== question.id);
  setQuestion(updatedData);
} catch (error) {
  console.error('Error deleting question:', error);
}
  }

  function handleUpdate(id, correctIndex) {
    const updatedData = questions.map((question) => {
      if (id === question.id) {
        return { ...question, correctIndex };
      }
      return question;
    });
    setQuestion(updatedData);
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
      {questions.map((question) => (
      <QuestionItem
        key={question.id}
            question={question}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
      ))}
    </ul>
    </section>
  );
}

export default QuestionList;

