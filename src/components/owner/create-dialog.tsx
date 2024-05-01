'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { CreateTeam } from '@/entities/team';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface HTMLProps {
  myDiv?: JSX.Element;
  title: string;
  description: string;
  action: string;
  slug: string;
  func: (teamCreate: CreateTeam) => void;
}

export const CreateDialog = (props: HTMLProps) => {
  const formSchema = z.object({
    name: z
      .string()
      .min(3, { message: 'O nome deve conter no mínimo 3 caracteres.' })
      .max(50, { message: 'O nome não pode exceder 50 caracteres.' }),
    code: z
      .string()
      .min(3, { message: 'Muito curto.' })
      .max(3, { message: 'Muito Longo.' }),
    type: z.enum(['amateur', 'club', 'selection']),
    country: z.optional(z.string()),
    logo: z
      .string()
      .min(3, { message: 'O logo deve conter no mínimo 3 caracteres.' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      code: '',
      type: 'club',
      country: '',
      logo: '',
    },
  });

  async function onSubmit({
    name,
    code,
    type,
    logo,
    country,
  }: z.infer<typeof formSchema>) {
    props.func({ name, code, type, logo, country });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{props.myDiv}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>*Nome (Obrigatório)</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>*Código (Obrigatório)</FormLabel>
                  <FormControl>
                    <Input placeholder="Código" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo:" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="club">Clube</SelectItem>
                      <SelectItem value="selection">Seleção</SelectItem>
                      <SelectItem value="amateur">Amador</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="País" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Logo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose
              type="submit"
              className="bg-violet-950 h-8 rounded-sm w-full"
            >
              <p className="text-white">Criar</p>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
