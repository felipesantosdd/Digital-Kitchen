import { Button, Form, Input } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '@/styles/login.module.css'



const Login = () => {
    const router = useRouter();

    const onFinish = async (values: any) => {
        const { email, password } = values;
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        });

        if (result?.ok) {
            router.push('/dashboard');
        } else {
            alert("Email ou senha incorretos!");
        }
    };

    return (
        <div className={styles.formContainer} >
            <h1 className={styles.formTitle}>Login</h1>
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }]}
                >
                    <Input placeholder="E-mail" />
                </Form.Item>

                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                >
                    <Input.Password placeholder="Senha" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%', margin: '15px 0' }}>
                        Entrar
                    </Button>
                    <h5 className={styles.span}>Não possui Cadastro? <a className={styles.link} href="/register">Cadastre-se</a></h5>
                </Form.Item>
            </Form>
        </div>

    );
};

export default Login;
