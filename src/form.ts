import { Form } from './components/form.ts'
import './styles/form.css'

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.twpx-b24a-form form').forEach((form) => {
        new Form( form as HTMLFormElement );
    })
});