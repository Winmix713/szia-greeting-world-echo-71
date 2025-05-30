import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { 
  Undo, 
  Redo, 
  Type, 
  Image, 
  Shapes, 
  Bold, 
  Italic, 
  Underline, 
  Palette, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Table,
  BarChart,
  Video,
  Link,
  MessageSquare,
  Layers,
  Grid,
  Settings
} from "lucide-react";

// Editor State Interface
interface EditorState {
  isBold: boolean;
  isItalic: boolean;
  isUnderlined: boolean;
  fontSize: string;
  fontFamily: string;
  textAlign: 'left' | 'center' | 'right';
  canUndo: boolean;
  canRedo: boolean;
  textColor: string;
}

interface EditorContextType {
  state: EditorState;
  executeCommand: (command: string, value?: string) => void;
  updateState: () => void;
  editorRef: React.RefObject<HTMLDivElement>;
}

// Create Editor Context
const EditorContext = createContext<EditorContextType | null>(null);

// Custom Button Component with Active State
interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ 
  onClick, 
  isActive, 
  disabled, 
  title, 
  children, 
  className = "h-8 w-8 p-0" 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`
      ${className}
      rounded-md transition-all duration-150
      ${isActive 
        ? 'bg-blue-100 text-blue-600 shadow-sm' 
        : 'hover:bg-gray-100 text-gray-600'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `}
  >
    {children}
  </button>
);

// Custom Select Component
interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}

const Select: React.FC<SelectProps> = ({ value, onChange, options, className = "w-28" }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`
      ${className} h-8 text-sm border-0 bg-transparent 
      hover:bg-gray-100 focus:ring-0 focus:outline-none
      rounded-md px-2 cursor-pointer
    `}
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const Separator = () => <div className="w-px h-6 bg-gray-300 mx-2" />;

// Toolbar Groups
const HistoryGroup: React.FC = () => {
  const context = useContext(EditorContext);
  if (!context) return null;
  
  const { state, executeCommand } = context;

  return (
    <div className="flex items-center gap-1">
      <ToolbarButton
        onClick={() => executeCommand('undo')}
        disabled={!state.canUndo}
        title="Undo (Ctrl+Z)"
      >
        <Undo className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => executeCommand('redo')}
        disabled={!state.canRedo}
        title="Redo (Ctrl+Y)"
      >
        <Redo className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
};

const InsertGroup: React.FC = () => {
  const context = useContext(EditorContext);
  if (!context) return null;
  
  const { executeCommand } = context;

  return (
    <div className="flex items-center gap-1">
      <ToolbarButton
        onClick={() => executeCommand('insertText')}
        title="Insert Text Box"
        className="h-8 px-3"
      >
        <Type className="h-4 w-4 mr-1.5" />
        <span className="text-sm">Text</span>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => executeCommand('insertImage')}
        title="Insert Image"
        className="h-8 px-3"
      >
        <Image className="h-4 w-4 mr-1.5" />
        <span className="text-sm">Image</span>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => executeCommand('insertShape')}
        title="Insert Shape"
        className="h-8 px-3"
      >
        <Shapes className="h-4 w-4 mr-1.5" />
        <span className="text-sm">Shape</span>
      </ToolbarButton>
    </div>
  );
};

const TypographyGroup: React.FC = () => {
  const context = useContext(EditorContext);
  if (!context) return null;
  
  const { state, executeCommand } = context;

  const fontOptions = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Times New Roman', label: 'Times' }
  ];

  const sizeOptions = [
    { value: '12', label: '12' },
    { value: '14', label: '14' },
    { value: '16', label: '16' },
    { value: '18', label: '18' },
    { value: '24', label: '24' },
    { value: '32', label: '32' }
  ];

  return (
    <div className="flex items-center gap-1">
      <Select
        value={state.fontFamily}
        onChange={(value) => executeCommand('fontName', value)}
        options={fontOptions}
      />
      <Select
        value={state.fontSize}
        onChange={(value) => executeCommand('fontSize', value)}
        options={sizeOptions}
        className="w-16"
      />
    </div>
  );
};

const FormattingGroup: React.FC = () => {
  const context = useContext(EditorContext);
  if (!context) return null;
  
  const { state, executeCommand } = context;

  return (
    <div className="flex items-center gap-1">
      <ToolbarButton
        onClick={() => executeCommand('bold')}
        isActive={state.isBold}
        title="Bold (Ctrl+B)"
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => executeCommand('italic')}
        isActive={state.isItalic}
        title="Italic (Ctrl+I)"
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => executeCommand('underline')}
        isActive={state.isUnderlined}
        title="Underline (Ctrl+U)"
      >
        <Underline className="h-4 w-4" />
      </ToolbarButton>
      <div className="relative">
        <input
          type="color"
          value={state.textColor}
          onChange={(e) => executeCommand('foreColor', e.target.value)}
          className="absolute inset-0 w-8 h-8 opacity-0 cursor-pointer"
          title="Text Color"
        />
        <ToolbarButton
          onClick={() => {}}
          title="Text Color"
        >
          <Palette className="h-4 w-4" />
        </ToolbarButton>
      </div>
    </div>
  );
};

const AlignmentGroup: React.FC = () => {
  const context = useContext(EditorContext);
  if (!context) return null;
  
  const { state, executeCommand } = context;

  return (
    <div className="flex items-center gap-1">
      <ToolbarButton
        onClick={() => executeCommand('justifyLeft')}
        isActive={state.textAlign === 'left'}
        title="Align Left"
      >
        <AlignLeft className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => executeCommand('justifyCenter')}
        isActive={state.textAlign === 'center'}
        title="Align Center"
      >
        <AlignCenter className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => executeCommand('justifyRight')}
        isActive={state.textAlign === 'right'}
        title="Align Right"
      >
        <AlignRight className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
};

const MediaGroup: React.FC = () => {
  const context = useContext(EditorContext);
  if (!context) return null;
  
  const { executeCommand } = context;

  return (
    <div className="flex items-center gap-1">
      <ToolbarButton
        onClick={() => executeCommand('insertTable')}
        title="Insert Table"
      >
        <Table className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => executeCommand('insertChart')}
        title="Insert Chart"
      >
        <BarChart className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => executeCommand('insertVideo')}
        title="Insert Video"
      >
        <Video className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => executeCommand('createLink')}
        title="Insert Link"
      >
        <Link className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => executeCommand('insertComment')}
        title="Insert Comment"
      >
        <MessageSquare className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
};

const UtilityGroup: React.FC = () => {
  const context = useContext(EditorContext);
  if (!context) return null;
  
  const { executeCommand } = context;

  return (
    <div className="flex items-center gap-1">
      <ToolbarButton
        onClick={() => executeCommand('toggleLayers')}
        title="Layers Panel"
      >
        <Layers className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => executeCommand('toggleGrid')}
        title="Show Grid"
      >
        <Grid className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => executeCommand('openSettings')}
        title="Settings"
      >
        <Settings className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
};

// Main Toolbar Component
const EnhancedEditorToolbar: React.FC = () => {
  return (
    <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 gap-1">
      <HistoryGroup />
      <Separator />
      <InsertGroup />
      <Separator />
      <TypographyGroup />
      <Separator />
      <FormattingGroup />
      <Separator />
      <AlignmentGroup />
      <Separator />
      <MediaGroup />
      <div className="flex-1" />
      <UtilityGroup />
    </div>
  );
};

// Editor Provider Component
const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<EditorState>({
    isBold: false,
    isItalic: false,
    isUnderlined: false,
    fontSize: '16',
    fontFamily: 'Inter',
    textAlign: 'left',
    canUndo: false,
    canRedo: false,
    textColor: '#000000'
  });

  const updateState = useCallback(() => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    setState(prev => ({
      ...prev,
      isBold: document.queryCommandState('bold'),
      isItalic: document.queryCommandState('italic'),
      isUnderlined: document.queryCommandState('underline'),
      canUndo: document.queryCommandEnabled('undo'),
      canRedo: document.queryCommandEnabled('redo'),
      textAlign: document.queryCommandValue('justifyLeft') ? 'left' :
                document.queryCommandValue('justifyCenter') ? 'center' :
                document.queryCommandValue('justifyRight') ? 'right' : 'left'
    }));
  }, []);

  const executeCommand = useCallback((command: string, value?: string) => {
    if (!editorRef.current) return;

    editorRef.current.focus();

    switch (command) {
      case 'bold':
      case 'italic':
      case 'underline':
      case 'undo':
      case 'redo':
      case 'justifyLeft':
      case 'justifyCenter':
      case 'justifyRight':
        document.execCommand(command, false);
        break;
      case 'fontName':
        document.execCommand('fontName', false, value);
        setState(prev => ({ ...prev, fontFamily: value || prev.fontFamily }));
        break;
      case 'fontSize':
        // Convert to HTML font size (1-7 scale)
        const htmlSize = Math.min(7, Math.max(1, Math.floor(parseInt(value || '16') / 4)));
        document.execCommand('fontSize', false, htmlSize.toString());
        setState(prev => ({ ...prev, fontSize: value || prev.fontSize }));
        break;
      case 'foreColor':
        document.execCommand('foreColor', false, value);
        setState(prev => ({ ...prev, textColor: value || prev.textColor }));
        break;
      case 'createLink':
        const url = prompt('Enter URL:');
        if (url) document.execCommand('createLink', false, url);
        break;
      case 'insertImage':
        const imgUrl = prompt('Enter image URL:');
        if (imgUrl) document.execCommand('insertImage', false, imgUrl);
        break;
      case 'insertTable':
        const tableHtml = '<table border="1"><tr><td>Cell 1</td><td>Cell 2</td></tr><tr><td>Cell 3</td><td>Cell 4</td></tr></table>';
        document.execCommand('insertHTML', false, tableHtml);
        break;
      default:
        console.log(`Command ${command} not implemented yet`);
    }

    // Update state after command execution
    setTimeout(updateState, 10);
  }, [updateState]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault();
            executeCommand('bold');
            break;
          case 'i':
            e.preventDefault();
            executeCommand('italic');
            break;
          case 'u':
            e.preventDefault();
            executeCommand('underline');
            break;
          case 'z':
            if (e.shiftKey) {
              e.preventDefault();
              executeCommand('redo');
            } else {
              e.preventDefault();
              executeCommand('undo');
            }
            break;
          case 'y':
            e.preventDefault();
            executeCommand('redo');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [executeCommand]);

  const contextValue: EditorContextType = {
    state,
    executeCommand,
    updateState,
    editorRef
  };

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
};

// Complete Editor Component
export default function CompleteEditor() {
  const context = useContext(EditorContext);
  
  const handleEditorInput = () => {
    if (context) {
      context.updateState();
    }
  };

  return (
    <EditorProvider>
      <div className="w-full max-w-6xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <EnhancedEditorToolbar />
        <div className="p-4">
          <div
            ref={context?.editorRef}
            contentEditable
            className="min-h-96 p-4 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onInput={handleEditorInput}
            onSelectionChange={handleEditorInput}
            onMouseUp={handleEditorInput}
            onKeyUp={handleEditorInput}
            style={{ fontFamily: context?.state.fontFamily || 'Inter' }}
            suppressContentEditableWarning={true}
          >
            <p>Start typing here... You can use the toolbar above or keyboard shortcuts:</p>
            <ul>
              <li><strong>Ctrl+B</strong> - Bold</li>
              <li><em>Ctrl+I</em> - Italic</li>
              <li><u>Ctrl+U</u> - Underline</li>
              <li><strong>Ctrl+Z</strong> - Undo</li>
              <li><strong>Ctrl+Y</strong> - Redo</li>
            </ul>
          </div>
        </div>
        <div className="px-4 pb-4 text-sm text-gray-500">
          Status: {context?.state.isBold ? 'Bold ' : ''}{context?.state.isItalic ? 'Italic ' : ''}{context?.state.isUnderlined ? 'Underlined ' : ''}
          | Font: {context?.state.fontFamily} {context?.state.fontSize}px
          | Align: {context?.state.textAlign}
        </div>
      </div>
    </EditorProvider>
  );
}