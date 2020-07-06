import styles from './inputForm.module.scss'
import classnames from 'classnames'
import { useState, useRef, useEffect } from 'react'

const actions = [
    'add',
    'set-url'
] 

const InputForm = () => {
    const repoRef = useRef(null)
    const firstAccess = useRef(true)
    const [form, setForm] = useState({
        repo: '',
        token: '',
        action: actions[0]
    })
    const [command, setCommad] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if(firstAccess.current && repoRef.current) {
            repoRef.current.focus()
            firstAccess.current = false
        }
        if(validateRepo() && form.token !== '') {
            generateCommand()
        } else {
            setCommad('')
            setShowResult(false)
        }
    }, [form])

    const onChangeHandler = e => {
        let newForm = {...form}
        newForm[e.target.id] = e.target.value
        setForm(newForm)
    }

    const validateRepo = () => {
        let newForm = {...form}
        let { repo } = newForm
        //TODO: Make repo form validation
        return repo !== ''
    }

    const generateCommand = () => {
        let newForm = {...form}
        let repoFrag = newForm.repo.split('/')
        if(repoFrag.length < 5) return
        let domain = repoFrag[2]
        let username = repoFrag[3]
        let repoName = repoFrag[4]
        let commandString = `git remote ${newForm.action} origin ${repoFrag[0]}//${username}:${newForm.token}@${domain}/${username}/${repoName}`
        setCommad(commandString)
        setShowResult(true)
    }

    const onCopyHandler = () => {
        navigator.clipboard.writeText(command).then(() => {
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 1000);
        }).catch(err => {
            console.error(`Could not copy: `, err);
        })
    }
 
    return (
        <div className={styles.frame}>
            <label className={styles.label} htmlFor="repo">URL for your Repo</label>
            <input
                ref={repoRef}
                type="url"
                id="repo"
                className={classnames(styles.input, styles.fluid)}
                value={form.repo}
                onChange={onChangeHandler}
                placeholder="https://gitlab.com/fauzialz/git-remote-token.git"
            />
            <p className={styles.inputNote}>
               *You can get this from your git repo.
            </p>

            <label className={styles.label} htmlFor="token">Access Token</label>
            <input
                id="token"
                className={classnames(styles.input, styles.fluid)}
                value={form.token}
                onChange={onChangeHandler}
                autocomplete="off"
            />
            <p className={classnames(styles.inputNote, styles.lastNote)}>
               {'*on Gitlab, go to setting > access token.'}
            </p>

            <div className={classnames(styles.result, {[styles.showResult]: showResult})}>
                <div className={styles.socket}>
                    <button className={styles.copyButton} onClick={onCopyHandler}>Copy</button>
                    <div className={classnames(styles.copyNotif, {[styles.copied]: copied})}>Copied</div>
                    <code
                        id="command"
                        className={classnames(styles.command, styles.fluid)}
                    >{command}</code>
                </div>
            </div>
        </div>
    )
}

export default InputForm