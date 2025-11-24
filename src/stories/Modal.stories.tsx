import type { Meta, StoryObj } from "@storybook/react";
import Modal from "../components/Modal/Modal";
import {useState} from 'react';
import type { ModalProps } from "../components/Modal/Modal";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Modal>;

const Template = (args: ModalProps) => {
  const [open, setOpen] = useState(args.isOpen);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: "8px 14px",
          borderRadius: "6px",
          background: "#333",
          color: "white",
        }}
      >
        Open Modal
      </button>

      <Modal {...args} isOpen={open} onClose={() => setOpen(false)}>
        <h2>Modal Title</h2>
        <p>This is a reusable modal component.</p>
      </Modal>
    </div>
  );
};

export const Default: Story = {
  args: {
    isOpen: false,
  },
  render: (args) => <Template {...args} />,
};

