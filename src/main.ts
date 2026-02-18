import './script.ts'
import './styles/style.css'
import { Form } from './components/form'


window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.twpx-b24a-form form').forEach((form) => {
        new Form( form as HTMLFormElement );
    })
});