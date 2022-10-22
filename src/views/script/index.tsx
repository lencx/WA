import GoBack from '@/components/GoBack';
import Editor from '@/components/Editor';

export default function ScriptView() {
  return (
    <div>
      <Editor
        lang="js"
        defaultValue={`// ROOT_PATH: ~/.wa/scripts

(function () {
  // code...
})()`}
      />
    </div>
  )
}